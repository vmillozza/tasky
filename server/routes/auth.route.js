import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/api/v1/signup', signup);

export default router;
