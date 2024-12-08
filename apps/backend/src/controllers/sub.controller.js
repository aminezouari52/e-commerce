const Sub = require("../models/sub");
const Product = require("../models/product");
const slugify = require("slugify");

const create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    res.json(await new Sub({ name, parent, slug: slugify(name) }).save());
  } catch (err) {
    console.log("SUB CREATE ERR ----->", err);
    res.status(400).send("Create sub failed");
  }
};

const list = async (req, res) =>
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());

const read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub })
    .populate("category")
    .exec();
  res.json({ sub, products });
};

const update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true },
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(400).send("Sub update failed");
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.status(400).send("Sub delete failed");
  }
};

module.exports = {
  create,
  list,
  read,
  update,
  remove,
};
