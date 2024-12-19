// const validateAddressInput = require("../validation/validateAddress");
const { Address, User } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const createAddress = async (req, res) => {
  const address = await Address.create(req.body);
  res.status(200).send(address);
};

const getAddress = async (req, res) => {
  const user = await User.findById(req.params.userId).exec();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const address = await Address.findOne({ user: user._id }).exec();
  res.status(httpStatus.OK).send(address);
};

module.exports = {
  createAddress,
  getAddress,
};
