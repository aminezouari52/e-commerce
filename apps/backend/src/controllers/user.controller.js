const { User, Product, Cart, Order } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const getUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).exec();

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  res.status(httpStatus.OK).send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const user = await User.findByIdAndUpdate(id, body, {
    new: true,
  }).exec();

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  res.status(httpStatus.OK).send(user);
});

const setUserCart = catchAsync(async (req, res) => {
  const { cart } = req.body;
  let products = [];
  const user = await User.findOne({ email: req.user.email }).exec();

  // Check if a cart with the logged-in user ID already exists and remove it if found
  await Cart.findOneAndDelete({ user: user._id }).exec();

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    let { price } = await Product.findById(cart[i]._id).select("price").exec();

    object.price = price;
    products.push(object);
  }

  let cartTotal = 0;

  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  await new Cart({
    products,
    cartTotal,
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

  res.status(httpStatus.OK).send({
    products: cart?.products || [],
    cartTotal: cart?.cartTotal || 0,
    totalAfterDiscount: cart?.totalAfterDiscount || 0,
  });
});

const emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const cart = await Cart.findOneAndRemove({ user: user._id }).exec();
  res.json(cart);
};

const saveAddress = catchAsync(async (req, res) => {
  await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address },
  ).exec();

  res.status(httpStatus.OK).send({ ok: true });
});

const savePhone = catchAsync(async (req, res) => {
  await User.findOneAndUpdate(
    { email: req.user.email },
    { phone: req.body.phone },
  ).exec();
  res.status(httpStatus.OK).send({ ok: true });
});

const createOrder = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const { amount } = req.body;

  let { products } = await Cart.findOne({ user: user._id }).exec();

  let newOrder = await new Order({
    orderStatus: "Not Processed",
    amount,
    products,
    user: user._id,
  }).save();

  // decrement quantity, increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  await Product.bulkWrite(bulkOption, {});

  console.log("NEW ORDER SAVED", newOrder);
  res.status(httpStatus.OK).send({ ok: true });
});

const orders = catchAsync(async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();

  let userOrders = await Order.find({ user: user._id })
    .populate("products.product")
    .exec();

  res.status(httpStatus).send(userOrders);
});

const addToWishlist = catchAsync(async (req, res) => {
  const { productId } = req.body;

  await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } },
  ).exec();

  res.status(httpStatus).send({ ok: true });
});

const getUserWishlist = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  res.status(httpStatus.OK).send(user);
});

const removeFromWishlist = catchAsync(async (req, res) => {
  const { productId } = req.params;
  await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } },
  ).exec();

  res.status(httpStatus.OK).send({ ok: true });
});

module.exports = {
  getUser,
  updateUser,
  setUserCart,
  getUserCart,
  emptyCart,
  saveAddress,
  savePhone,
  createOrder,
  orders,
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
};
