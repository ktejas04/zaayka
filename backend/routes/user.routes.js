import express from 'express';
import { loginUser, registerUser, resetPassword, sendResetLink } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/forgot-password', sendResetLink); 
userRouter.patch('/reset-password/:resetToken', resetPassword);

export default userRouter;