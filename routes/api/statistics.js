const express = require("express");
const router = express.Router();
const { authenticate, controllerSync } = require("../../middlewares");
const {
  getTransactionsStatsByMonthYear,
} = require("../../controllers/statistics");

// api/statistics
router.get("/", authenticate, controllerSync(getTransactionsStatsByMonthYear));

module.exports = router;
