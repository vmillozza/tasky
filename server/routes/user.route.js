import express from 'express';
import {getUser,updateUser,deleteUser,insertUser} from '../controllers/user.controller.js';

const userRoutes = express.Router();

//userRoutes.get('/', test);
userRoutes.get('/:id', getUser);
userRoutes.patch('/update/:id', updateUser);
userRoutes.delete('/delete/:id', deleteUser);
userRoutes.post('/insert/:id', insertUser)
export default userRoutes;
