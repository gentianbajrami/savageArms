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
      existingItem.quantity += +amount;
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
  const { id: productId } = req.params;

  const cart = await Cart.findOne({
    createdBy: req.user.userId,
  });

  if (!cart) {
    return res
      .status(404)
      .json({ msg: 'Cart not found' });
  }

  cart.cartItems = cart.cartItems.filter(
    item => item.product.toString() !== productId
  );

  // Recalculate totals
  const orderTotal = cart.cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const numItemsInCart = cart.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  cart.orderTotal = orderTotal;
  cart.numItemsInCart = numItemsInCart;
  cart.cartTotal =
    orderTotal + cart.tax + cart.shipping;

  await cart.save();

  return res.status(200).json({
    msg: 'Cart Item removed succesfully',
  });
};
export const getCart = async (req, res, next) => {
  console.log(req.user.userId);
  const cart = await Cart.findOne({
    createdBy: req.user.userId,
  }).populate('cartItems.product');

  // if (!cart)
  //   return new NotFoundError('Cart not found');
  console.log(cart);
  return res
    .status(StatusCodes.OK)
    .json({ cart });
};

export const updateProductQuantityInCart = async (
  req,
  res
) => {
  const { id: productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({
      msg: 'Quantity must be at least 1',
    });
  }

  const cart = await Cart.findOne({
    createdBy: req.user.userId,
  });

  if (!cart) {
    return res
      .status(404)
      .json({ msg: 'Cart not found' });
  }

  const item = cart.cartItems.find(
    item => item.product.toString() === productId
  );

  if (!item) {
    return res
      .status(404)
      .json({ msg: 'Product not in cart' });
  }

  item.quantity = quantity;

  // Recalculate totals
  cart.orderTotal = cart.cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  cart.numItemsInCart = cart.cartItems.reduce(
    (sum, i) => sum + i.quantity,
    0
  );
  cart.cartTotal =
    cart.orderTotal + cart.tax + cart.shipping;

  await cart.save();

  return res.status(200).json({
    msg: 'Product quantity updated',
    cart,
  });
};
