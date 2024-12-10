const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    address: String,
    phone: String,
    wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
