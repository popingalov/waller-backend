const express = require("express");
const router = express.Router();
const { authenticate, controllerSync } = require("../../middlewares");
const { getTransactionsByMonthYear } = require("../../controllers/statistics");

// api/statistics
router.get("/", authenticate, controllerSync(getTransactionsByMonthYear));

module.exports = router;
