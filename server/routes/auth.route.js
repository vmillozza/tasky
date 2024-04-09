import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import {
    signup,
    signin,
    signOut,
  } from '../controllers/auth.controller.js';
const router = express.Router();
router. post ( '/signup ' , signup);
router. post ( '/signin ' , signin);
router. get ( '/signout ' , signOut);
router.post('/signup', signup);

export default router;
