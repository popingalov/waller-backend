const express = require('express');
const router = express.Router();
const { authenticate, controllerSync } = require('../../middlewares');
const {
  getTransactionsStatsByMonthYear,
} = require('../../controllers/statistics');

// api/statistics
router.post('/', authenticate, controllerSync(getTransactionsStatsByMonthYear));

module.exports = router;
