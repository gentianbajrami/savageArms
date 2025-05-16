import { Router } from 'express';
const router = Router();

import {
  createReview,
  getAllReviews,
  getAllReviewsForProduct,
  updateReview,
  deleteReview,
} from '../controller/reviewControler.js';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authMiddleware.js';
import { validateCreateReview } from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';
router
  .route('/')
  .post(authenticateUser, checkForTestUser, validateCreateReview, createReview)
  .get(authenticateUser, authorizePermissions('admin'), getAllReviews);
router.get('/products/:id', getAllReviewsForProduct);
router
  .route('/:id')
  .patch(authenticateUser, checkForTestUser, validateCreateReview, updateReview)
  .delete(authenticateUser, checkForTestUser, deleteReview);

export default router;
