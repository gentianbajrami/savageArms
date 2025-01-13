import { Router } from 'express';
import {
  createBlog,
  getSingleBlog,
  allBlogs,
  updateBlog,
  deleteBlog,
} from '../controller/blogController.js';
import { validateCreateBlogInput } from '../middleware/validationMiddleware.js';
import upload from '../middleware/multerMiddleware.js';
const router = Router();

router
  .route('/')
  .post(
    upload.single('image'),
    validateCreateBlogInput,
    createBlog
  )
  .get(allBlogs);
router
  .route('/:id')
  .get(getSingleBlog)
  .patch(
    upload.single('image'),
    validateCreateBlogInput,
    updateBlog
  )
  .delete(deleteBlog);

export default router;
