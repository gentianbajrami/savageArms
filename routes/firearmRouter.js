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

router.route('/').get(getAllFirearms).post(validateFirearmsInput, createFirearm);

router
  .route('/:id')
  .get(validateIdParam, getOneFirearm)
  .patch(validateFirearmsInput, validateIdParam, updateFirearm)
  .delete(validateIdParam, deleteFirearm);

export default router;
