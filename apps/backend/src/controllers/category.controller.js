const { Category, Sub, Product } = require("../models");
const slugify = require("slugify");

const create = async (req, res) => {
  req.body.slug = slugify(req.body.name);
  const newCategory = new Category(req.body);
  newCategory["status"] = "yes";
  newCategory
    .save()
    .then((resp) => {
      res.json({
        resp,
      });
    })
    .catch((err) => {
      if (err?.code === 11000) {
        return res.status(400).json({
          message: "Create category failed, Category duplicated",
          status: "error",
          error: true,
        });
      } else {
        return res.status(400).json({
          message: "Create category failed",
          status: "error",
          error: true,
        });
      }
    });
};

const list = async (req, res) =>
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());

const listParents = async (req, res) => {
  await Category.find({ categoryType: "parent" })
    .sort({ createdAt: -1 })
    .exec()
    ?.then((data) => {
      return res.status(200).json({
        message: "Fetching categories success",
        data: data,
        status: "success",
        error: false,
      });
    })
    ?.catch(() => {
      return res.status(400).json({
        message: "Fetching categories failed",
        status: "error",
        error: true,
      });
    });
};
const read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  // res.json(category);
  const products = await Product.find({ category }).populate("category").exec();
  res.json({
    category,
    products,
  });
};

const update = async (req, res) => {
  req.body.slug = slugify(req.body.name);
  if (req.body?.parent === "" || !req?.body?.parent) {
    req.body.parent = null;
    req.body.categoryType = "parent";
  } else {
    req.body.categoryType = "child";
  }
  try {
    await Category.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
    })
      .then((data) => {
        return res.status(200).json({
          message: "Update category success",
          status: "success",
          error: false,
          data: data,
        });
      })
      .catch((err) => {
        if (err?.code === 11000) {
          return res.status(400).json({
            message: "Create category failed, Category duplicated",
            status: "error",
            error: true,
          });
        } else {
          return res.status(400).json({
            message: "Create category failed",
            status: "error",
            error: true,
          });
        }
      });
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(400).json({
        message: "Create category failed, Category duplicated",
        status: "error",
        error: true,
      });
    } else {
      return res.status(400).json({
        message: "Create category failed",
        status: "error",
        error: true,
      });
    }
    // res.status(400).send("Create update failed");
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    await Sub.deleteMany({ parent: deleted._id });
    await Product.deleteMany({ category: deleted._id });
    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create delete failed");
  }
};

const getSubs = async (req, res) => {
  try {
    const subs = await Sub.find({ parent: req.params._id });
    res.json(subs);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  create,
  list,
  listParents,
  read,
  update,
  remove,
  getSubs,
};
