import { Router } from 'express';
import {
  createCheckoutSession,
  getAllOrders,
} from '../controller/orderController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
const router = Router();

router.get('/', authenticateUser, getAllOrders);
router.post(
  '/create-checkout-session',
  authenticateUser,
  createCheckoutSession
);

export default router;
