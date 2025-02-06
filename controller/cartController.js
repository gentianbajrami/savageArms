import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import Cart from '../models/Cart.js';
import Product from '../models/FirearmsModel.js';

export const addProductToCart = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const { amount } = req.body;
  const product = await Product.findById(id);
  if (!product)
    return new NotFoundError('Product not found');

  const doesCartExist = await Cart.findOne({
    createdBy: req.user.userId,
  });

  if (doesCartExist) {
    const existingItem =
      doesCartExist.cartItems.find(
        item => item.product.toString() === id
      );

    if (existingItem) {
      existingItem.quantity += amount;
    } else {
      doesCartExist.cartItems.push({
        product: id,
        quantity: amount,
        price: product?.price,
      });
    }

    doesCartExist.numItemsInCart += amount;
    doesCartExist.cartTotal +=
      product.price * amount;
    console.log(doesCartExist);
    await doesCartExist.save();
    return res
      .status(StatusCodes.OK)
      .json({ cart: doesCartExist });
  } else {
    const newCart = new Cart({
      createdBy: req.user.userId,
      cartItems: [
        {
          product: id,
          quantity: amount,
          price: product?.price,
        },
      ],
      numItemsInCart: amount,
      cartTotal: product.price * amount,
    });
    await newCart.save();
    return res
      .status(StatusCodes.OK)
      .json({ cart: newCart });
  }
};

export const removeProductFromCart = async (
  req,
  res,
  next
) => {
  return res.send('removeProductFromCart');
};
export const getCart = async (req, res, next) => {
  const cart = await Cart.findOne({
    createdBy: req.user.userId,
  }).populate('cartItems.product');

  if (!cart)
    return new NotFoundError('Cart not found');

  return res
    .status(StatusCodes.OK)
    .json({ cart });
};
