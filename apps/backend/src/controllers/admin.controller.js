const { Order } = require("../models");
let errorMessage = "An error has accured";
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

//orders, orderStatus

// const orders = async (req, res) => {
//   let allOrders = await Order.find({})
//     .sort("-createdAt")
//     .populate("products.product")
//     .exec();

//   res.json(allOrders);
// };

const orders = async (req, res) => {
  try {
    // createdAt/updatedAt, desc/asc, 3
    // const { sort, order, limit } = req.params;
    await Order.find()
      .populate("products.product")
      .populate("user")
      .sort({ createdAt: -1 })
      // .limit(limit)
      .exec()
      .then((products) => {
        return res
          .status(200)
          .json({ data: products, status: "success", error: false });
      })
      .catch((error) => {
        return res.status(400).json({
          message: errorMessage,
          err: error.message,
          status: "error",
          error: true,
        });
      });
  } catch (error) {
    return res.status(400).json({
      message: errorMessage,
      err: error.message,
      status: "error",
      error: true,
    });
  }
};

const orderStatus = catchAsync(async (req, res) => {
  const { orderId, orderStatus } = req.body;
  const order = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true },
  ).exec();
  res.status(httpStatus.OK).send(order);
});

module.exports = {
  orders,
  orderStatus,
};
