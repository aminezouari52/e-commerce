const express = require("express");

const router = express.Router();

const { authCheck } = require("../../middlewares/auth");

const cartController = require("../../controllers/cart.controller");

router
  .route("/")
  .get(authCheck, cartController.getUserCart)
  .post(authCheck, cartController.syncUserCart);

module.exports = router;
