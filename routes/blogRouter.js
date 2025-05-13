// routes/blogRoutes.js
import express from 'express';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authMiddleware.js';
import {
  getPublishedPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  updateComment,
  deleteComment,
  deletePost,
  addComment,
  toggleLike,
} from '../controller/blogsController.js';
import upload from '../middleware/multerMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', getPublishedPosts);
router.get('/slug/:slug', getPostBySlug);
router.get('/:id', getPostById);

router.post(
  '/',
  upload.single('image'),
  authenticateUser,
  checkForTestUser,
  authorizePermissions('admin'),
  createPost
);
router.patch(
  '/:id',
  upload.single('image'),
  authenticateUser,
  checkForTestUser,
  authorizePermissions('admin'),
  updatePost
);
router.delete('/:id', authenticateUser, checkForTestUser, deletePost);

router.post('/:slug/comments', authenticateUser, checkForTestUser, addComment);
router.patch(
  '/:slug/comments/:commentId',
  authenticateUser,
  checkForTestUser,
  updateComment
);
router.delete(
  '/:slug/comments/:commentId',
  authenticateUser,
  checkForTestUser,
  deleteComment
);

router.post('/:id/like', authenticateUser, toggleLike);

export default router;
