// const validateAddressInput = require("../validation/validateAddress");
const { Address, User } = require("../models");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const createAddress = catchAsync(async (req, res) => {
  const address = await Address.create(req.body);
  res.status(httpStatus.OK).send(address);
});

const getUserAddress = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId).exec();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const address = await Address.findOne({ user: user._id }).exec();
  res.status(httpStatus.OK).send(address);
});

const updateAddress = catchAsync(async (req, res) => {
  const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).exec();
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, "Address not found");
  }
  res.status(httpStatus.OK).send(address);
});

module.exports = {
  createAddress,
  getUserAddress,
  updateAddress,
};
