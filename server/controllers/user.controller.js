import { connectToDatabase } from '../libraries/dbConnect.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
/*export const test = async (req, res) => {
  try {
    const db = await connectToDatabase(); // Assicurati che questa funzione ritorni un oggetto db
    const collection = db.collection('users'); // Ottieni la collezione 'users'
    let results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Errore nel server", error: error.message });
  }
};*/

export const getUser = async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const query = { _id: new ObjectId(req.params.id) };
    const user = await collection.findOne(query);

    if (!user) {
      return next({ status: 404, message: 'User not found!' });
    }

    const { password, ...userWithoutPassword } = user; // Rimuovi i campi sensibili
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const query = { _id: new ObjectId(req.params.id) };
    await collection.deleteOne(query);
    res.status(200).json({ message: 'User has been deleted!' });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

export const insertUser = async (req, res, next) => {
  try {
    // Hash della password se presente nella richiesta
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Crea il documento utente da inserire, aggiungendo i campi createdAt e updatedAt
    const newUser = {
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Inserisce il nuovo utente nella collezione
    const result = await collection.insertOne(newUser);

    // Verifica se l'utente è stato effettivamente inserito
    if (!result.acknowledged || !result.insertedId) {
      return next({ status: 500, message: 'Failed to insert user' });
    }

    // Recupera l'utente inserito (escludendo la password) per la risposta
    const insertedUser = await collection.findOne({ _id: new ObjectId(result.insertedId) }, {
      projection: { password: 0 }
    });

    // Invia l'utente inserito come risposta, escludendo la password
    res.status(201).json(insertedUser);
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};
export const updateUser = async (req, res, next) => {
  try {
    // Se la password è presente nella richiesta, hashala
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    
    const query = { _id: new ObjectId(req.params.id) };
    const data = {
      $set: {
        ...req.body,
        updatedAt: new Date().toISOString(),
      },
    };
    const options = {
      returnDocument: 'after', // Aggiornato per la chiarezza e compatibilità con le versioni più recenti di MongoDB
    };

    const result = await collection.findOneAndUpdate(query, data, options);
    const updatedUser = result.value; // Assicurati che questa sia la corretta struttura di risposta per il tuo driver/versione di MongoDB

    // Verifica se l'utente è stato effettivamente aggiornato
    if (!updatedUser) {
      return next({ status: 404, message: 'User not found!' });
    }
    
    // Destruttura per rimuovere i campi che non vuoi restituire
    const { password, ...rest } = updatedUser;
    
    res.status(200).json(rest);
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};