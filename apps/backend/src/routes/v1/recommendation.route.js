const express = require("express");
const router = express.Router();

const recommendationController = require("../../controllers/recommendation.controller");

router
  .route("/recommendations")
  .get(recommendationController.getRecommendations);

module.exports = router;
