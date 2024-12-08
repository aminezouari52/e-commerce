const express = require("express");
const addressRoute = require("./address.route");
const adminRoute = require("./admin.route");
const authRoute = require("./auth.route");
const categoryRoute = require("./category.route");
const cloudinaryRoute = require("./cloudinary.route");
const orderRoute = require("./order.route");
const productRoute = require("./product.route");
const recommendationRoute = require("./recommendation.route");
const subRoute = require("./sub.route");
const userRoute = require("./user.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/address",
    route: addressRoute,
  },
  {
    path: "/admin",
    route: adminRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
  {
    path: "/cloudinary",
    route: cloudinaryRoute,
  },
  {
    path: "/order",
    route: orderRoute,
  },
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/recommendation",
    route: recommendationRoute,
  },
  {
    path: "/sub",
    route: subRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
