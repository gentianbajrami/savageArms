import mongoose from 'mongoose';
import slugify from 'slugify';
import BlogPost from '../models/Blog.js';
import { StatusCodes } from 'http-status-codes';
import { checkPermissions } from '../utils/checkPermissions.js';
import { NotFoundError } from '../errors/customErrors.js';

// GET all published posts
export const getPublishedPosts = async (
  req,
  res
) => {
  const posts = await BlogPost.find({
    status: 'published',
  })
    .sort({ createdAt: -1 })
    .populate('author');
  return res
    .status(StatusCodes.OK)
    .json({ posts });
};

// GET one post by slug (and bump views)
export const getPostBySlug = async (req, res) => {
  const post = await BlogPost.findOneAndUpdate(
    {
      slug: req.params.slug,
      status: 'published',
    },
    { $inc: { views: 1 } },
    { new: true }
  ).populate('author', 'username');
  if (!post)
    return res
      .status(404)
      .json({ error: 'Not found' });
  res.json(post);
};

// GET one post by ID
export const getPostById = async (req, res) => {
  if (
    !mongoose.Types.ObjectId.isValid(
      req.params.id
    )
  ) {
    return res
      .status(400)
      .json({ error: 'Invalid ID' });
  }

  const post = await BlogPost.findById(
    req.params.id
  ).populate('author');

  if (!post)
    return res
      .status(404)
      .json({ error: 'Not found' });

  res.json(post);
};

// CREATE a new post
export const createPost = async (req, res) => {
  const {
    title,
    content,
    featuredImage,
    tags = [],
    category = 'General',
    status = 'draft',
  } = req.body;

  const slug = slugify(title, {
    lower: true,
    strict: true,
  });
  const readTime = Math.ceil(
    content.split(/\s+/).length / 200
  );

  const newPost = new BlogPost({
    title,
    slug,
    content,
    featuredImage,
    tags,
    category,
    status,
    readTime,
    author: req.user.userId,
  });

  await newPost.save();
  return res.status(201).json({
    post: newPost,
    msg: 'post created succesfully',
  });
};

// UPDATE a post
export const updatePost = async (req, res) => {
  const updates = { ...req.body };
  if (updates.title) {
    updates.slug = slugify(updates.title, {
      lower: true,
      strict: true,
    });
  }
  if (updates.content) {
    updates.readTime = Math.ceil(
      updates.content.split(/\s+/).length / 200
    );
  }

  const post = await BlogPost.findById(
    req.params.id
  );
  if (!post)
    return res
      .status(404)
      .json({ error: 'Not found' });

  checkPermissions(req.user, post.author);

  Object.assign(post, updates);
  await post.save();

  return res
    .status(StatusCodes.OK)
    .json({ post, msg: 'blog updated' });
};

// DELETE a post
export const deletePost = async (req, res) => {
  const post = await BlogPost.findById(
    req.params.id
  );

  if (!post)
    return res
      .status(404)
      .json({ error: 'Not found' });

  checkPermissions(req.user, post.author);

  await post.deleteOne();
  res.json({ message: 'Post deleted' });
};

// ADD a comment
export const addComment = async (req, res) => {
  const { content } = req.body;
  const post = await BlogPost.findById(
    req.params.id
  );

  if (!post)
    throw new NotFoundError('post not found');

  post.comments.push({
    user: req.user?.userId,
    content,
  });

  await post.save();

  return res.status(StatusCodes.CREATED).json({
    post,
  });
};

// EDIT a comment
export const updateComment = async (req, res) => {
  const post = await BlogPost.findById(
    req.params.id
  );

  if (!post)
    throw new NotFoundError('post not found');

  const comment = post.comments.id(
    req.params.commentId
  );

  if (!comment)
    throw new NotFoundError('comment not found');

  checkPermissions(req.user, comment.user);

  comment.content = req.body.content;
  await post.save();

  return res
    .status(StatusCodes.OK)
    .json({ msg: 'comment updated', post });
};

// DELETE a comment
export const deleteComment = async (req, res) => {
  const post = await BlogPost.findById(
    req.params.id
  );

  if (!post)
    throw new NotFoundError('blog not found');

  const comment = post.comments.id(
    req.params.commentId
  );

  if (!comment)
    throw new NotFoundError('comment not found');

  checkPermissions(req.user, comment.user);

  comment.deleteOne();
  await post.save();
  res
    .status(StatusCodes.OK)
    .json({ message: 'Comment deleted', post });
};

// TOGGLE like/unlike
export const toggleLike = async (req, res) => {
  const { id } = req.params;
  const uid = req.user.userId.toString();

  // Find post
  const post = await BlogPost.findById(id);

  if (!post)
    throw new NotFoundError('blog not found');

  // Determine if already liked
  const hasLiked = post.likes.some(
    like => like?.toString() === uid
  );

  // Atomic update
  const updatedPost =
    await BlogPost.findByIdAndUpdate(
      id,
      hasLiked
        ? { $pull: { likes: uid } }
        : { $addToSet: { likes: uid } },
      { new: true }
    );

  res.json({
    likes: updatedPost.likes.length,
    liked: !hasLiked,
    updatedPost,
  });
};
