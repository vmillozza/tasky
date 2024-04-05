import "dotenv/config";
import { connectToDatabase } from "./libraries/dbConnect.js";

const users = [
  {
    username: "nathan121",
    email: "nathan@mail.com",
    password: "$2b$10$v05yRWdxlp1j6riuSilOzu71x145viXeGC7AHT5R0WcycGalmYTae",
    avatar: "https://g.codewithnathan.com/default-user.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    username: "jane78",
    email: "jane@mail.com",
    password: "$2b$10$v05yRWdxlp1j6riuSilOzu71x145viXeGC7AHT5R0WcycGalmYTae",
    avatar: "https://g.codewithnathan.com/default-user.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
const tasks = [
  {
    name: "Read Atomic Habits",
    description: "Finish reading Atomic Habits by James Clear",
    priority: "not urgent",
    due: new Date().toISOString(),
    status: "open",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: "Learn MERN Stack",
    description:
      "Learn the MERN stack and build a full-stack application with it",
    priority: "urgent",
    due: new Date().toISOString(),
    status: "open",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

async function seedData() {
    let client;
    try {
      ({ client } = await connectToDatabase()); // Destruttura sia client che db
      // Il resto del tuo codice per operare sul database
      console.log("[seed]", "All Done");
    } catch (error) {
      console.error("[seed]", "Error:", error);
    } finally {
      if (client) {
        await client.close(); // Usa client.close() per chiudere la connessione
      }
    }
  }
  
  seedData().then(() => process.exit());
