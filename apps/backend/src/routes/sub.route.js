const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

const subController = require("../controllers/sub.controller");

// routes
router.post("/sub", authCheck, adminCheck, subController.create);
router.get("/subs", subController.list);
router.get("/sub/:slug", subController.read);
router.put("/sub/:slug", authCheck, adminCheck, subController.update);
router.delete("/sub/:slug", authCheck, adminCheck, subController.remove);

module.exports = router;
