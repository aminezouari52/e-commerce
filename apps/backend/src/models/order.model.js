const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    amount: Number,
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
        price: Number,
      },
    ],
    unpayed: {
      type: Number,
      trim: true,
      default: function () {
        return this.amount;
      },
    },
    payed: {
      type: Number,
      trim: true,
      default: 0,
    },
    email: String,
    isEmailVerified: Boolean,
    name: String,
    phone: String,
    status: {
      type: String,
      enum: ["pending-verification", "processing", "completed", "cancelled"],
      default: "pending-verification",
    },
    shippingType: {
      type: String,
      enum: ["pickup-in-store", "ship"],
      default: "ship",
    },
    paymentType: {
      type: String,
      enum: ["cash", "card", "transfer"],
      default: "cash",
    },
    ref: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
      default: "000000",
    },
    user: {
      default: null,
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
