export const errorHandler = (err, req, res, next) => {
    // Imposta un messaggio di errore predefinito
    const defaultMessage = "We're having technical issues. Please try again later.";
    
    // Estrai lo status, il messaggio e l'errore dall'oggetto err, se disponibile
    const { status = 500, message, error } = err;
    
    // Se esiste un errore specifico, loggalo nella console
    if (error) {
      console.log(error);
    }
    
    // Invia la risposta con lo status code fornito o 500 se non specificato.
    // Usa il messaggio dell'errore se disponibile, altrimenti usa il messaggio di default
    res.status(status).json({ message: message || defaultMessage });
  };
  