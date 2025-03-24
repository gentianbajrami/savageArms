import { Router } from 'express';
const router = Router();
import {
  createFirearm,
  deleteFirearm,
  getAllFirearms,
  getOneFirearm,
  updateFirearm,
} from '../controller/firearmsController.js';
import {
  validateFirearmsInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

router
  .route('/')
  .get(getAllFirearms)
  .post(
    upload.single('photo'),
    validateFirearmsInput,
    createFirearm
  );

router
  .route('/:id')
  .get(validateIdParam, getOneFirearm)
  .patch(
    upload.single('photo'),
    validateFirearmsInput,
    validateIdParam,
    updateFirearm
  )
  .delete(validateIdParam, deleteFirearm);

export default router;
