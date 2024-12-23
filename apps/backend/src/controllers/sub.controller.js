const { Sub, Product } = require("../models");
const slugify = require("slugify");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const create = catchAsync(async (req, res) => {
  const { name, parent } = req.body;
  res
    .status(httpStatus.OK)
    .send(await new Sub({ name, parent, slug: slugify(name) }).save());
});

const list = catchAsync(async (req, res) =>
  res
    .status(httpStatus.OK)
    .send(await Sub.find({}).sort({ createdAt: -1 }).exec()),
);

const read = catchAsync(async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub })
    .populate("category")
    .exec();
  res.status(httpStatus.OK).send({ sub, products });
});

const update = catchAsync(async (req, res) => {
  const { name, parent } = req.body;
  const updated = await Sub.findOneAndUpdate(
    { slug: req.params.slug },
    { name, parent, slug: slugify(name) },
    { new: true },
  );
  res.status(httpStatus.OK).send(updated);
});

const remove = catchAsync(async (req, res) => {
  const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
  res.status(httpStatus.OK).send(deleted);
});

module.exports = {
  create,
  list,
  read,
  update,
  remove,
};
