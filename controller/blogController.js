import Blog from '../models/BlogModel.js';
import cloudinary from 'cloudinary';
import { formatImage } from '../middleware/multerMiddleware.js';
import { BadRequestError } from '../errors/customErrors.js';
import { StatusCodes } from 'http-status-codes';

export const createBlog = async (
  req,
  res,
  next
) => {
  let image, imagePublicId;

  console.log(req?.image, req.file);
  if (!req.file) {
    throw new BadRequestError(
      'You must provide a file'
    );
  }
  const file = formatImage(req.file);
  const response =
    await cloudinary.v2.uploader.upload(file);
  image = response.secure_url;
  imagePublicId = response.public_id;
  const blog = new Blog({
    ...req.body,
    image,
    imagePublicId,
  });
  await blog.save();
  res
    .status(201)
    .json({ msg: 'created successfully' });
};

export const allBlogs = async (
  req,
  res,
  next
) => {
  const blogs = await Blog.find({});
  res.status(200).json({ blogs });
};
export const getSingleBlog = async (
  req,
  res,
  next
) => {
  const blog = await Blog.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job: blog });
};

export const updateBlog = async (
  req,
  res,
  next
) => {
  let image, imagePublicId;

  console.log(req?.image, req.file);
  if (req.file) {
    const file = formatImage(req.file);
    const response =
      await cloudinary.v2.uploader.upload(file);
    image = response.secure_url;
    imagePublicId = response.public_id;
  }
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { ...req.body, imagePublicId, image }
  );

  if (req.file && blog.imagePublicId) {
    await cloudinary.v2.uploader.destroy(
      blog.imagePublicId
    );
  }
  res
    .status(201)
    .json({ msg: 'created successfully' });
};

export const deleteBlog = async (
  req,
  res,
  next
) => {
  const removedBlog =
    await Blog.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({
    msg: 'job deleted',
    blog: removedBlog,
  });
};
