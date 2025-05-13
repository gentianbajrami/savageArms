import { Router } from 'express';
import {
  confirmOrder,
  createCheckoutSession,
  getAllOrders,
} from '../controller/orderController.js';
import { authenticateUser, checkForTestUser } from '../middleware/authMiddleware.js';
const router = Router();

router.get('/', authenticateUser, getAllOrders);
router.post('/create-checkout-session', authenticateUser, createCheckoutSession);
router.post('/confirm-order', authenticateUser, checkForTestUser, confirmOrder);

export default router;
