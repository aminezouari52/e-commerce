const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const addressSchema = new mongoose.Schema(
  {
    address: String,
    status: {
      type: String,
      enum: ["enabled", "disabled"],
      default: "enabled",
    },
    user: {
      type: ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Address", addressSchema);
