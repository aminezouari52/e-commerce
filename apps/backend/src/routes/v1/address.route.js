const express = require("express");
const router = express.Router();
const addressController = require("../../controllers/address.controller");

router.post("/", addressController.createAddress);

router.get("/:userId", addressController.getAddress);

module.exports = router;
