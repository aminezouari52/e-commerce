const { Product, User } = require("../models");
const slugify = require("slugify");

const create = async (req, res) => {
  try {
    const data = req.body;
    data.subs = [];

    if (req?.body?.subs?.length !== 0) {
      data.subs = req?.body?.subs;
    }

    data.slug = slugify(data.title);
    const file = req?.file;
    let path = `${file?.destination}/${file?.filename}`.slice(1);
    let images = [];
    images?.push(path);
    if (data?.images?.length > 0) {
      images.splice(1, 0, ...data.images);
    } else {
      data.images = images;
    }
    const newProduct = await new Product(data).save();
    res.json(newProduct);
  } catch (err) {
    res.status(400).json({
      err: err.message,
    });
  }
};
const listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

const remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    console.log(error);
    return res.staus(400).send("Product delete failed");
  }
};

const read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

const update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true },
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE ERROR ----> ", err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

const list = async (req, res) => {
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, limit } = req.body;
    const products = await Product.find({})
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(limit)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const productStar = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.productId });
  const user = await User.findOne({ email: req.user.email }).exec();

  const { star } = req.body;

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Check if the user has already rated this product
  const existingRatingIndex = product.ratings.findIndex(
    (r) => r.postedBy.toString() === user._id.toString(),
  );

  if (existingRatingIndex === -1) {
    product.ratings.push({ star, postedBy: user._id });
    await product.save();
  } else {
    product.ratings[existingRatingIndex].star = star;
    await product.save();
  }

  res.json({ messageCode: "PRR01", message: "Product Rating Updated" });
};

const listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subs")
    .exec();

  res.json(related);
};

const searchFilters = async (req, res) => {
  const { query, price, category, sub, shipping, color, brand } = req.body;

  const filterOptions = {};

  if (query) filterOptions.$text = { $search: query };
  if (price && price.length === 2) {
    filterOptions.price = {
      $gte: price[0],
      $lte: price[1],
    };
  }
  if (category && category.length) filterOptions.category = { $in: category };
  if (sub && sub.length) filterOptions.subs = { $in: sub };
  if (brand && brand.length) filterOptions.brand = { $in: brand };
  if (color && color.length) filterOptions.color = { $in: color };
  if (shipping) filterOptions.shipping = shipping;

  const products = await Product.find(filterOptions)
    .populate("category", "_id name")
    .populate("subs", "_id name")
    // .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

module.exports = {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productStar,
  listRelated,
  searchFilters,
};
