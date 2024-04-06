import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const logToFile = async (message) => {
  try {
    // Ottieni il percorso del file corrente
    const __filename = fileURLToPath(import.meta.url);

    // Ottieni la directory del file corrente
    const __dirname = dirname(__filename);
    const logFilePath = path.join(__dirname, "app.log");
    // Aggiunge un timestamp al messaggio
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;

    // Scrive in modo asincrono il messaggio sul file di log
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error("Errore durante la scrittura sul file di log", err);
      }
    });
  } catch (error) {
    console.error(error); // Modificato per fornire un messaggio di errore più leggibile
  }
};
