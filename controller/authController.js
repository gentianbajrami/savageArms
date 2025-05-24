import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/UserModel.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';
import moment from 'moment-timezone';
import LoginEvent from '../models/LoginEvent.js';

export const register = async (req, res) => {
  const isFirstUser = (await UserModel.countDocuments()) === 0;
  req.body.role = isFirstUser
    ? 'admin'
    : req.body.role === 'company'
    ? 'company'
    : 'user';

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await UserModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};

export const login = async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) {
    throw new UnauthenticatedError('invalid credentials');
  }

  user.lastLogin = moment().tz('Europe/Belgrade').toDate();
  await user.save();

  // Log the login event separately:
  await LoginEvent.create({
    user: user._id,
    timestamp: user.lastLogin,
  });

  if (user.locked) {
    return res.status(403).json({ msg: 'Your account has been locked' });
  }

  const token = createJWT({
    userId: user._id,
    role: user.role,
  });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged in' });
};

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out' });
};
