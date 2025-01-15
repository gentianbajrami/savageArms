import User from '../models/UserModel.js';
import Firearms from '../models/FirearmsModel.js';
import { StatusCodes } from 'http-status-codes';

export const getAllFirearms = async (req, res) => {
  const firearms = await Firearms.find({ companyId: req.user.userId });
  res.status(StatusCodes.OK).json({ firearms });
};

export const getOneFirearm = async (req, res) => {
  const firearm = await Firearms.findById(req.params.id);
  res.status(StatusCodes.OK).json({ firearm });
};

export const createFirearm = async (req, res, next) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  console.log(user);
  if (user.role !== 'admin' && user.role !== 'company') {
    throw new Error('Only admins and companies can create firearms');
  }

  const firearm = new Firearms({
    ...req.body,
    companyId: userId,
  });

  await firearm.save();
  res.status(StatusCodes.CREATED).json({ firearm });
};

export const updateFirearm = async (req, res) => {
   console.log('User in Update Firearm:', req.user);
  const updatedFirearm = await Firearms.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
    console.log(updatedFirearm);
  res.status(StatusCodes.OK).json({ msg: 'firearm modified', firearm: updatedFirearm });
};

export const deleteFirearm = async (req, res) => {
  const firearms = await Firearms.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: 'firearm deleted', firearm: firearms });
};
