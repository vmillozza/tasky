import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../libraries/dbConnect.js'; // Percorso corretto
import { logToFile } from '../libraries/logFile.js';


export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //logToFile("req.body=>" + req.body);
    // Log della password (assicurati di rimuoverlo o di usare un livello di log appropriato in produzione)
    //logToFile("password=>" + password);

    if (!password || !email || !username) {
      // Gestisce il caso in cui uno dei campi richiesti manchi
      return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    const db = await connectToDatabase();
    const collection = db.collection('users'); // Assicura che `db` sia pronto prima di accedere a `collection`

    // Verifica l'esistenza di un utente con la stessa email o username
    const existingUser = await collection.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(422).json({
        message: 'Email or Username is already registered.',
      });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea l'oggetto utente
    const user = {
      username,
      email,
      password: hashedPassword,
      avatar: 'https://example.com/default-user.png', // URL di un avatar di default (sostituire con un URL appropriato)
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Inserisce l'utente nel database
    const { insertedId } = await collection.insertOne(user);

    // Crea un token JWT
    const token = jwt.sign({ id: insertedId }, process.env.AUTH_SECRET, { expiresIn: '1d' });

    // Prepara l'utente per la risposta, escludendo i campi sensibili
    const { password: _, ...userWithoutPassword } = user;
    userWithoutPassword._id = insertedId;

    // Invia la risposta con il cookie del token e i dati dell'utente
    return res
      .cookie('taskly_token', token, { httpOnly: true })
      .status(201)
      .json(userWithoutPassword);
  } catch (error) {
    // Gestione degli errori
    logToFile("Signup error: " + error.message); // Considera di loggare l'errore
    return next({
      status: 500,
      message: 'An error occurred during the signup process.',
    });
    
  }
  
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await collection.findOne({ email });
    if (!validUser) {
      return next({ status: 404, message: 'User not found!' });
    }
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next({ status: 401, message: 'Wrong password!' });
    }
    const token = jwt.sign({ id: validUser._id }, process.env.AUTH_SECRET);
    const { password: pass, updatedAt, createdAt, ...rest } = validUser;
    res
      .cookie('taskly_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next({ status: 500, error });
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('taskly_token');
    res.status(200).json({ message: 'Sign out successful' });
  } catch (error) {
    next({ status: 500 });
  }
};
