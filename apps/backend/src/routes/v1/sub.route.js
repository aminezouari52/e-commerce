const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../../middlewares/auth");

const subController = require("../../controllers/sub.controller");

// routes
router.post("/", authCheck, adminCheck, subController.create);
router.get("/", subController.list);
router.get("/:slug", subController.read);
router.put("/:slug", authCheck, adminCheck, subController.update);
router.delete("/:slug", authCheck, adminCheck, subController.remove);

module.exports = router;
