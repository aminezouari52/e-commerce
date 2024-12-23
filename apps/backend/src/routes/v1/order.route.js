const express = require("express");

const router = express.Router();

// const { authCheck, adminCheck } = require("../../middlewares/auth");

const orderController = require("../../controllers/order.controller");

// router.get(
//   "/orders/AllOrdersAdmin",
//   authCheck,
//   adminCheck,
//   orderController.orders,
// );

router.route("/").post(orderController.createOrder);

module.exports = router;
