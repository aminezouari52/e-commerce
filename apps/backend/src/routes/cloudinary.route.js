const express = require("express");
const router = express.Router();

// MIDDLEWARES
const { authCheck, adminCheck } = require("../middlewares/auth");

const cloudinaryController = require("../controllers/cloudinary.controller");

router.post(
  "/uploadimages",
  authCheck,
  adminCheck,
  cloudinaryController.upload,
);
router.post("/removeimage", authCheck, adminCheck, cloudinaryController.remove);

module.exports = router;
