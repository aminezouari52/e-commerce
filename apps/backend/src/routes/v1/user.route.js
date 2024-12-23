const express = require("express");

const router = express.Router();

const { authCheck } = require("../../middlewares/auth");

const userController = require("../../controllers/user.controller");

router
  .route("/:id")
  .get(userController.getUser)
  .patch(authCheck, userController.updateUser);

router
  .route("/cart")
  .get(authCheck, userController.getUserCart)
  .post(authCheck, userController.setUserCart)
  .delete(authCheck, userController.emptyCart);

router.route("/address").post(authCheck, userController.saveAddress);

router.route("/phone").post(authCheck, userController.savePhone);
router.route("/order").post(authCheck, userController.createOrder);
router.route("/orders").get(authCheck, userController.orders);

router
  .route("/wishlist")
  .post(authCheck, userController.addToWishlist)
  .get(authCheck, userController.wishlist);

router
  .route("/wishlist/:productId")
  .put(authCheck, userController.removeFromWishlist);

module.exports = router;
