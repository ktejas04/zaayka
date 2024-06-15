import { Router } from 'express';
import { addToCart, removeFromCart,getCart, clearCart, deleteFromCart } from '../controllers/cart.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const cartRouter = Router();

cartRouter.post('/add', authMiddleware, addToCart);
cartRouter.post('/remove', authMiddleware, removeFromCart);
cartRouter.post('/delete', authMiddleware, deleteFromCart);
cartRouter.get('/get', authMiddleware, getCart);  //check if get or post
cartRouter.post('/clear', authMiddleware, clearCart);

export default cartRouter;
