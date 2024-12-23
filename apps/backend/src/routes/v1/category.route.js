const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../../middlewares/auth");

const categoryController = require("../../controllers/category.controller");

// routes
router.route("/").post(authCheck, adminCheck, categoryController.create);

router.route("/categories").get(categoryController.list);

router.route("/parentcategories").get(categoryController.listParents);

router
  .route("/:slug")
  .get(categoryController.read)
  .put(authCheck, adminCheck, categoryController.update)
  .delete(authCheck, adminCheck, categoryController.remove);

router.route("/subs/:_id").get(categoryController.getSubs);

module.exports = router;
