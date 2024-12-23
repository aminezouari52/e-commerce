const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../../middlewares/auth");

const adminController = require("../../controllers/admin.controller");

router.route("/orders").get(authCheck, adminCheck, adminController.orders);

router
  .route("/order-status")
  .put(authCheck, adminCheck, adminController.orderStatus);

module.exports = router;
