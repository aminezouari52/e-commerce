const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../../middlewares/auth");

const adminController = require("../../controllers/admin.controller");

router.get("/orders", authCheck, adminCheck, adminController.orders);
router.put("/order-status", authCheck, adminCheck, adminController.orderStatus);

module.exports = router;
