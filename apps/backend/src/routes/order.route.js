const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const orderController = require("../controllers/orders.controller");

router.get(
  "/orders/AllOrdersAdmin",
  authCheck,
  adminCheck,
  orderController.orders
);

router.post("/order", orderController.createOrder);

module.exports = router;
