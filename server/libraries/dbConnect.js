import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

const MONGODB_URI ='mongodb://127.0.0.1:27017';
const MONGODB_DATABASE ='tasky';
const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let dbConnection;

async function connectToDatabase() {
  if (!dbConnection) { // Check if we already have a connection to the database
    try {
      await client.connect();
      console.log('Connected to MongoDB!');
      dbConnection = client.db(MONGODB_DATABASE); // Cache the database connection
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
      throw err;
    }
  }
  return dbConnection;
}

export { connectToDatabase };
