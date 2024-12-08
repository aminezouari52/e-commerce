const express = require("express");
const router = express.Router();
const addressController = require("../../controllers/address.controller");

router.post("/", addressController.createAddress);

module.exports = router;
