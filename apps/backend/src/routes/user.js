const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth");

const {
  setUserCart,
  getUserCart,
  emptyCart,
  saveAddress,
  createOrder,
  orders,
  savePhone,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  updateUser,
} = require("../controllers/user");

router.patch("/user/:id", authCheck, updateUser);
router.post("/user/cart", authCheck, setUserCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);
router.post("/user/phone", authCheck, savePhone);
router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders);
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

module.exports = router;
