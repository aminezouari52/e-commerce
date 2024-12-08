const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

const categoryController = require("../controllers/category.controller");

// routes
router.post("/category", authCheck, adminCheck, categoryController.create);
router.get("/categories", categoryController.list);
router.get("/parentcategories", categoryController.listParents);
router.get("/category/:slug", categoryController.read);
router.put("/category/:slug", authCheck, adminCheck, categoryController.update);
router.delete(
  "/category/:slug",
  authCheck,
  adminCheck,
  categoryController.remove,
);
router.get("/category/subs/:_id", categoryController.getSubs);

module.exports = router;
