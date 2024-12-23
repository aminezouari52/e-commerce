const express = require("express");
const router = express.Router();
const addressController = require("../../controllers/address.controller");

router.route("/").post(addressController.createAddress);

router.route("/:id").patch(addressController.updateAddress);

router.route("/:userId").get(addressController.getUserAddress);

module.exports = router;
