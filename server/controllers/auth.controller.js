import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {connectToDatabase} from '../libraries/dbConnect.js'; // Correzione del percorso

// Nota: spostare la logica di inizializzazione della collezione all'interno della funzione potrebbe essere una pratica migliore
// per evitare errori dovuti al tentativo di accedere a `db` prima che la connessione sia effettivamente stabilita.

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const collection = await db.collection('users'); // Spostato qui per assicurarsi che db sia pronto
    const query = {
      $or: [{ email }, { username }],
    };
    const existingUser = await collection.findOne(query);
    if (existingUser) {
      return next({
        status: 422,
        message: 'Email or Username is already registered.',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      username,
      email,
      password: hashedPassword,
      avatar: 'https://g.codewithnathan.com/default-user.png', // Assicurati che l'URL sia corretto e accessibile
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Qui dovresti aggiungere il codice per inserire `user` nel database
    // Ad esempio: await collection.insertOne(user);
    const { insertedld} = await collection. insertOne (user);
    const token = jwt. sign({ id : insertedld }, process.env.AUTH_SECRET);
    user._id = insertedld;
    const { password : pass, updatedAt, createdAt, ... rest } = user;
    // Segue la logica per gestire la risposta positiva, ad esempio inviare indietro l'utente creato (senza password)
    // Omitting logic for positive response handling, e.g., sending back the created user (without password)
    res
    .cookie('taskly_token' , token, { httpOnly: true })
    .status(200)
    . json(rest);
  } catch (error) {
    next({ status: 500, message: error.message }); // Modificato per fornire un messaggio di errore più leggibile
  }
};
