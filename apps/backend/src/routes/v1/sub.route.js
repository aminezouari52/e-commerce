const express = require("express");
const router = express.Router();

const { authCheck, adminCheck } = require("../../middlewares/auth");

const subController = require("../../controllers/sub.controller");

router
  .route("/")
  .get(subController.list)
  .post(authCheck, adminCheck, subController.create);

router
  .route("/:slug")
  .get(subController.read)
  .put(authCheck, adminCheck, subController.update)
  .delete(authCheck, adminCheck, subController.remove);

module.exports = router;
