import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/orders', OrderController.createOrder);
router.get('/orders/revenue', OrderController.getOrderRevenue);

export const OrderRouter = router;
