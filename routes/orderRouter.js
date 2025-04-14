import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
} from '../controller/orderController';
import { authenticateUser } from '../middleware/authMiddleware.js';
const router = Router();

router.get('/', authenticateUser, getAllOrders);
router.post('/', createOrder);

export default router;
