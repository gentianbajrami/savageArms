import { body, validationResult, param } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import UserModel from '../models/UserModel.js';
import Firearms from '../models/FirearmsModel.js';
import {
  FIREARMS_CALIBER,
  FIREARMS_MANUFACTURER,
  FIREARMS_MODEL,
  FIREARMS_TYPE,
} from '../utils/constants.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};
import mongoose from 'mongoose';

export const validateFirearmsInput = withValidationErrors([
  body('fullName')
    .notEmpty()
    .withMessage('Full Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Full Name must be between 3 and 50 characters'),
  body('photo').notEmpty().withMessage('Photo is required'),
  body('photo.*').optional().isURL().withMessage('Each photo must be a valid URL'),
  body('features').notEmpty().withMessage('Minimum a feature is required'),
  body('caliber')
    .notEmpty()
    .withMessage('Caliber is required')
    .isIn(Object.values(FIREARMS_CALIBER))
    .withMessage(
      `Caliber must be one of: ${Object.values(FIREARMS_CALIBER).join(', ')}`
    ),
  body('model')
    .notEmpty()
    .withMessage('Model is required')
    .isIn(Object.values(FIREARMS_MODEL))
    .withMessage(
      `Model must be one of: ${Object.values(FIREARMS_MODEL).join(', ')}`
    ),
  body('manufacturer')
    .notEmpty()
    .withMessage('Manufacturer is required')
    .isIn(Object.values(FIREARMS_MANUFACTURER))
    .withMessage(
      `Manufacturer must be one of: ${Object.values(FIREARMS_MANUFACTURER).join(
        ', '
      )}`
    ),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((value) => value > 0)
    .withMessage('Price must be greater than 0'),
  body('stock')
    .notEmpty()
    .withMessage('Stock is required')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative number'),
  body('description').notEmpty().withMessage('Description is required'),
  body('capacity')
    .notEmpty()
    .withMessage('Capacity is required')
    .isNumeric()
    .withMessage('Capacity must be a number')
    .custom((value) => value > 0)
    .withMessage('Capacity must be greater than 0'),
  body('type')
    .notEmpty()
    .withMessage('Type is required')
    .isIn(Object.values(FIREARMS_TYPE))
    .withMessage(`Type must be one of: ${Object.values(FIREARMS_TYPE).join(', ')}`),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new BadRequestError('Invalid MongoDB ID');
    }
    const firearm = await Firearms.findById(value);
    if (!firearm) {
      throw new NotFoundError(`No firearm with id ${value}`);
    }
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === firearm.companyId.toString();

    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('firstName').notEmpty().withMessage('First Name is required'),
  body('lastName').notEmpty().withMessage('Last Name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await UserModel.findOne({
        email,
      });
      if (user) {
        throw new BadRequestError('email already exists!');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('firstName').notEmpty().withMessage('First Name is required'),
  body('lastName').notEmpty().withMessage('Last Name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await UserModel.findOne({
        email,
      });
      if (user) {
        throw new BadRequestError('email already exists!');
      }
    }),
]);

export const validateCreateBlogInput = withValidationErrors([
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
]);
