import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  username: { type: String, required: false }, // helpful for display
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    }, // e.g. /blog/how-to-code
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    featuredImage: { type: String }, // URL or file path
    tags: [{ type: String }],
    category: {
      type: String,
      default: 'General',
    },
    comments: [commentSchema],
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    readTime: { type: Number }, // in minutes
    views: { type: Number, default: 0 },
    imagePublicId: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  'Blog',
  blogPostSchema
);
