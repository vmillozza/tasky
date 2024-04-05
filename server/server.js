import express from 'express';
import userRoutes from './routes/user.route.js'; 
import { errorHandler} from './libraries/middleware.js' ;
const app = express();
app.use(express.json());
app.use('/users', userRoutes);
const PORT = 8000;

async function startServer() {
  try {
   
    app.use('*', (req, res) => {
      res.status(404).json({ message: 'Not found' });
    });
    app. use(errorHandler);
    // Now safe to start the server
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

startServer();