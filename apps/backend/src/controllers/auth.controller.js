const { User } = require("../models");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const createOrUpdateUser = catchAsync(async (req, res) => {
  const { picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true },
  );
  if (user) {
    res.status(httpStatus.OK).send(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    res.status(httpStatus.OK).send(newUser);
  }
});

const currentUser = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  res.status(httpStatus.OK).send(user);
});

module.exports = {
  createOrUpdateUser,
  currentUser,
};
