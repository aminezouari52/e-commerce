const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../../middlewares/auth");

const categoryController = require("../../controllers/category.controller");

// routes
router.post("/", authCheck, adminCheck, categoryController.create);
router.get("/categories", categoryController.list);
router.get("/parentcategories", categoryController.listParents);
router.get("/:slug", categoryController.read);
router.put("/:slug", authCheck, adminCheck, categoryController.update);
router.delete("/:slug", authCheck, adminCheck, categoryController.remove);
router.get("/subs/:_id", categoryController.getSubs);

module.exports = router;
