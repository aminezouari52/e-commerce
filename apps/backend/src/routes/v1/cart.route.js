const express = require("express");

const router = express.Router();

const { authCheck } = require("../../middlewares/auth");

const cartController = require("../../controllers/cart.controller");

router
  .route("/")
  .get(authCheck, cartController.getUserCart)
  .post(authCheck, cartController.setUserCart)
  .delete(authCheck, cartController.emptyUserCart);

router
  .route("/product")
  .post(authCheck, cartController.addUserProduct)
  .put(authCheck, cartController.updateUserProductCount);

router.route("/:productId").delete(authCheck, cartController.deleteUserProduct);

module.exports = router;
