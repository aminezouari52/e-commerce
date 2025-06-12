const { Product, User, Order } = require("../models");
const uniqueRef = require("../utils/uniqueRef");
const isValidObjectId = require("../validation/is-valid-object");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const createOrder = async (req, res) => {
  const { amount, userId, products, email, name, phone } = req.body;

  let newOrder = {
    email,
    name,
    phone,
    products,
    amount,
  };

  if (userId && isValidObjectId(userId)) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    newOrder.user = userId;
  }

  newOrder.ref = uniqueRef();

  const order = await Order.create(newOrder);

  // decrement quantity, increment sold
  const bulkOption = products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { quantity: -product.count, sold: product.count } },
      },
    };
  });

  await Product.bulkWrite(bulkOption, {});

  console.log("NEW ORDER SAVED");

  return res.status(200).send({
    message: "Order sent successfully",
    data: order,
    status: "success",
    error: false,
  });
};

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
          // message: errorMessage,
          err: error.message,
          status: "error",
          error: true,
        });
      });
  } catch (error) {
    return res.status(400).json({
      // message: errorMessage,
      err: error.message,
      status: "error",
      error: true,
    });
  }
};

module.exports = {
  createOrder,
  orders,
};
