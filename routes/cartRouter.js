import { Router } from 'express';
import {
  addProductToCart,
  removeProductFromCart,
  getCart,
} from '../controller/cartController.js';
const router = Router();

router.get('/', getCart);
router.post('/add-product/:id', addProductToCart);
router.delete(
  '/remove-product/:id',
  removeProductFromCart
);

export default router;
