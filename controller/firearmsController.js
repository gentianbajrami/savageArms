import User from '../models/UserModel.js';
import Firearms from '../models/FirearmsModel.js';
import { StatusCodes } from 'http-status-codes';
import cloudinary from 'cloudinary';
import { formatImage } from '../middleware/multerMiddleware.js';

export const getAllFirearms = async (
  req,
  res
) => {
  const { search, caliber, model, sort } =
    req.query;

  const queryObject = {};

  if (search) {
    queryObject.$or = [
      {
        fullName: {
          $regex: search,
          $options: 'i',
        },
      },
      // {
      //   description: {
      //     $regex: search,
      //     $options: 'i',
      //   },
      // },
    ];
  }

  if (caliber && caliber !== 'all') {
    queryObject.caliber = caliber;
  }

  if (model && model !== 'all') {
    queryObject.model = model;
  }
  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };

  const sortKey =
    sortOptions[sort] || sortOptions.newest;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const firearms = await Firearms.find(
    queryObject
  )
    .sort(sortKey)
    .skip(skip)
    .limit(limit);
  console.log(queryObject);
  res.status(StatusCodes.OK).json({
    products: firearms,
    meta: {},
    params: queryObject,
  });
};

export const getOneFirearm = async (req, res) => {
  const firearm = await Firearms.findById(
    req.params.id
  );
  res.status(StatusCodes.OK).json({ firearm });
};

// export const createFirearm = async (req, res, next) => {
//   const userId = req.user.userId;
//   const user = await User.findById(userId);
//   console.log(user);
//   if (user.role !== 'admin' && user.role !== 'company') {
//     throw new Error('Only admins and companies can create firearms');
//   }

//   const firearm = new Firearms({
//     ...req.body,
//     companyId: userId,
//   });

//   await firearm.save();
//   res.status(StatusCodes.CREATED).json({ firearm });
// };

export const createFirearm = async (
  req,
  res,
  next
) => {
  try {
    console.log('File:', req.file); // Debugging: Log the uploaded file
    console.log('Body:', req.body);
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (
      user.role !== 'admin' &&
      user.role !== 'company'
    ) {
      throw new Error(
        'Only admins and companies can create firearms'
      );
    }

    const firearmData = {
      ...req.body,
      companyId: userId,
    };

    if (req.file) {
      const file = formatImage(req.file);
      const response =
        await cloudinary.v2.uploader.upload(file);
      firearmData.photo = response.secure_url;
      firearmData.photoPublicId =
        response.public_id;
    }

    const firearm = new Firearms(firearmData);
    await firearm.save();

    res
      .status(StatusCodes.CREATED)
      .json({ firearm });
  } catch (error) {
    next(error);
  }
};

export const updateFirearm = async (req, res) => {
  try {
    const firearmData = { ...req.body };

    if (req.file) {
      firearmData.photo = req.file.path;
    }

    const updatedFirearm =
      await Firearms.findByIdAndUpdate(
        req.params.id,
        firearmData,
        { new: true }
      );

    res.status(StatusCodes.OK).json({
      msg: 'Firearm modified',
      firearm: updatedFirearm,
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Failed to update firearm' });
  }
};

export const deleteFirearm = async (req, res) => {
  const firearms =
    await Firearms.findByIdAndDelete(
      req.params.id
    );
  res.status(StatusCodes.OK).json({
    msg: 'firearm deleted',
    firearm: firearms,
  });
};
