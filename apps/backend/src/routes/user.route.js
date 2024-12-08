const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth");

const userController = require("../controllers/user.controller");

router.patch("/user/:id", authCheck, userController.updateUser);
router.post("/user/cart", authCheck, userController.setUserCart);
router.get("/user/cart", authCheck, userController.getUserCart);
router.delete("/user/cart", authCheck, userController.emptyCart);
router.post("/user/address", authCheck, userController.saveAddress);
router.post("/user/phone", authCheck, userController.savePhone);
router.post("/user/order", authCheck, userController.createOrder);
router.get("/user/orders", authCheck, userController.orders);
router.post("/user/wishlist", authCheck, userController.addToWishlist);
router.get("/user/wishlist", authCheck, userController.wishlist);
router.put(
  "/user/wishlist/:productId",
  authCheck,
  userController.removeFromWishlist,
);

module.exports = router;
