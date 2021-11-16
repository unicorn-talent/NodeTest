const express = require("express");
const router = express.Router();

// import controller
const marketController = require("../controllers/market.controller");

router.get("/price", marketController.getMarketPrice);

module.exports = router;