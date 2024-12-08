const express = require("express");

const router = express.Router();

const { authCheck } = require("../../middlewares/auth");

const userController = require("../../controllers/user.controller");

router.patch("/:id", authCheck, userController.updateUser);
router.post("/cart", authCheck, userController.setUserCart);
router.get("/cart", authCheck, userController.getUserCart);
router.delete("/cart", authCheck, userController.emptyCart);
router.post("/address", authCheck, userController.saveAddress);
router.post("/phone", authCheck, userController.savePhone);
router.post("/order", authCheck, userController.createOrder);
router.get("/orders", authCheck, userController.orders);
router.post("/wishlist", authCheck, userController.addToWishlist);
router.get("/wishlist", authCheck, userController.wishlist);
router.put(
  "/wishlist/:productId",
  authCheck,
  userController.removeFromWishlist,
);

module.exports = router;
