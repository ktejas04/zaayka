import { Router } from "express"
import { updateOrderStatus, listAllOrders, listOrders, placeOrder, verifyOrder, checkOrderStatus } from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const orderRouter = Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.get('/list',authMiddleware, listOrders);
orderRouter.post('/track',authMiddleware, checkOrderStatus);
orderRouter.get('/all-orders', listAllOrders);
orderRouter.post('/change-status', updateOrderStatus);

export default orderRouter;