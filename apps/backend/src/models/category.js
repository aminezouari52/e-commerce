const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    image: {
      type: Array,
    },
    status: {
      type: String,
      enum: ["yes", "no"],
      default: "yes",
    },
    categoryType: {
      type: String,
      enum: ["parent", "child"],
      default: "parent",
      default: function () {
        return this.parent === null ? "parent" : "child";
      },
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
