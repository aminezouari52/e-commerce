const httpStatus = require("http-status");
const { User } = require("../models");
const catchAsync = require("../utils/catchAsync");

const getRecommendations = catchAsync(async (req, res) => {
  // Retrieve user information from request
  await User.findOne({ email: "ahmedmohsen@gmail.com" }).exec();

  // Pass user data to your recommendation model
  // // const recommendations = recommendationModel(userData);

  res.status(httpStatus.OK).send({
    // recommendations
  });
});

module.exports = {
  getRecommendations,
};
