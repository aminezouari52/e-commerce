const { User, Cart } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const syncUserCart = catchAsync(async (req, res) => {
  const { cart } = req.body;
  let products = [];
  const user = await User.findOne({ email: req.user.email }).exec();

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check if a cart with the logged-in user ID already exists and remove it if found
  await Cart.findOneAndDelete({ user: user._id }).exec();

  for (let i = 0; i < cart?.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
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

module.exports = {
  syncUserCart,
  getUserCart,
};
