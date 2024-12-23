const express = require("express");
const router = express.Router();

// MIDDLEWARES
const { authCheck, adminCheck } = require("../../middlewares/auth");

const cloudinaryController = require("../../controllers/cloudinary.controller");

router
  .route("/uploadimages")
  .post(authCheck, adminCheck, cloudinaryController.upload);

router
  .route("/removeimage")
  .post(authCheck, adminCheck, cloudinaryController.remove);

module.exports = router;
