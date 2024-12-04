const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");

const uniqueRef = require("../utils/uniqueRef");
const isValidObjectId = require("../validation/is-valid-object");

exports.createOrder = async (req, res) => {
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
      return res.status(404).json({ error: "User not found" });
    }
    newOrder["user"] = userId;
  }

  newOrder["ref"] = uniqueRef();

  const order = await Order.create(newOrder);

  // decrement quantity, increment sold
  const bulkOption = products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product.product._id },
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

exports.orders = async (req, res) => {
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
