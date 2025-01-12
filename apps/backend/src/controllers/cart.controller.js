const { User, Cart, Product } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const addUserProduct = catchAsync(async (req, res) => {
  const { productId, count } = req.body;

  const user = await User.findOne({ email: req.user.email }).exec();
  const product = await Product.findById(productId).exec();

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  let cart = await Cart.findOne({ user: user._id }).exec();

  if (!cart) {
    cart = new Cart({
      products: [
        {
          product: productId,
          count,
        },
      ],
      user: user._id,
    });
  } else {
    let product = cart.products.find((p) => p.product.toString() === productId);
    if (product) product.count += count;
    else
      cart.products.push({
        product: productId,
        count,
      });
  }

  await cart.save();

  res.status(httpStatus.OK).send({
    status: "success",
    message: "cart updated successfully",
    cart,
  });
});

const updateUserProductCount = catchAsync(async (req, res) => {
  const { productId, count } = req.body;

  const user = await User.findOne({ email: req.user.email }).exec();
  let product = await Product.findById(productId).exec();

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const cart = await Cart.findOne({ user: user._id }).exec();

  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cart not found");
  }

  product = cart.products.find((p) => p.product.toString() === productId);

  if (product) product.count = count;

  await cart.save();

  res.status(httpStatus.OK).send({
    status: "success",
    message: "cart updated successfully",
    cart,
  });
});

const deleteUserProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const user = await User.findOne({ email: req.user.email }).exec();
  const product = await Product.findById(productId).exec();

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  let cart = await Cart.findOne({ user: user._id }).exec();

  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cart not found");
  }

  cart = await Cart.findByIdAndUpdate(
    cart._id,
    { $pull: { products: { product: productId } } },
    { new: true },
  );

  res.status(httpStatus.OK).send({
    status: "success",
    message: "cart updated successfully",
    cart,
  });
});

const setUserCart = catchAsync(async (req, res) => {
  const { cart } = req.body;
  let products = [];
  const user = await User.findOne({ email: req.user.email }).exec();

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check if a cart with the logged-in user ID already exists and remove it if found
  await Cart.findOneAndDelete({ user: user._id }).exec();

  for (let i = 0; i < cart.products.length; i++) {
    let object = {};
    object.product = cart.products[i].product._id;
    object.count = cart.products[i].count;
    products.push(object);
  }

  await new Cart({
    products,
    user: user._id,
  }).save();

  res.status(httpStatus.OK).send({ ok: true });
});

const getUserCart = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ user: user._id })
    .populate({
      path: "products.product",
      populate: {
        path: "category",
      },
    })
    .exec();

  res.status(httpStatus.OK).send(cart);
});

const emptyUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const cart = await Cart.findOneAndRemove({ user: user._id }).exec();
  res.json(cart);
};

module.exports = {
  setUserCart,
  getUserCart,
  emptyUserCart,
  addUserProduct,
  updateUserProductCount,
  deleteUserProduct,
};
