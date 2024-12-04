const express = require("express");

const router = express.Router();

// middlewares
const { orders, orderStatus } = require("../controllers/admin");
const { authCheck, adminCheck } = require("../middlewares/auth");

// routes
router.get("/admin/orders", authCheck, adminCheck, orders);
router.put("/admin/order-status", authCheck, adminCheck, orderStatus);

module.exports = router;
