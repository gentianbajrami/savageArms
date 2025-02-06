import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  cartItems: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: 'Firearms',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderTotal: {
    type: Number,
    default: 0,
  },
  numItemsInCart: {
    type: Number,
    default: 0,
  },
  shipping: {
    type: Number,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0,
  },
  cartTotal: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('Cart', cartSchema);
