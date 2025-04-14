import { Router } from 'express';
import {
  addProductToCart,
  removeProductFromCart,
  getCart,
  updateProductQuantityInCart,
} from '../controller/cartController.js';
const router = Router();

router.get('/', getCart);
router.post('/add-product/:id', addProductToCart);
router.delete(
  '/remove-product/:id',
  removeProductFromCart
);
router.patch(
  '/update-product/:id',
  updateProductQuantityInCart
);

export default router;
