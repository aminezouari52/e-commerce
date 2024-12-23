const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../../middlewares/auth");

const authController = require("../../controllers/auth.controller");

router
  .route("/create-or-update-user")
  .post(authCheck, authController.createOrUpdateUser);

router.route("/current-user").post(authCheck, authController.currentUser);

router
  .route("/current-admin")
  .post(authCheck, adminCheck, authController.currentUser);

module.exports = router;
