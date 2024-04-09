import express from "express";
import userRoutes from "./routes/user.route.js";
import { errorHandler } from "./libraries/middleware.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "swagger-jsdoc";
import cors from "cors";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { logToFile } from './libraries/logFile.js';

const app = express();
// Solo in ambiente di sviluppo, reindirizza le richieste al client React
if (process.env.NODE_ENV === 'development') {
  logToFile('development');
  app.use('/api/v1/', createProxyMiddleware({ 
      target: 'http://localhost:8000', // Porta su cui gira il server React in sviluppo
      changeOrigin: true,
  }));
}

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
// Rotta per servire la documentazione Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users/users", userRoutes);
const PORT = 8000;

async function startServer() {
  try {
    app.use("*", (req, res) => {
      res.status(404).json({ message: "Not found" });
    });
    app.use(errorHandler);
    // Now safe to start the server
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

startServer();
