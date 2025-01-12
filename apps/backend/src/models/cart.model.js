const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          required: true,
          ref: "Product",
        },
        count: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    user: { type: ObjectId, ref: "User" },
  },
  { timestamps: true },
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
