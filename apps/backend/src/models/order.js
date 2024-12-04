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
    name: String,
    phone: String,
    status: {
      type: String,
      enum: [
        "pending",
        "awaiting-payment",
        "awaiting-fulfillment",
        "awaiting-shipment",
        "awaiting-pickup",
        "partially-shipped",
        "completed",
        "shipped",
        "cancelled",
        "declined",
        "refunded",
        "disputed",
        "manual-verification-required",
        "partially-refunded",
      ],
      default: "pending",
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
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
