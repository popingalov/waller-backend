const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares");
const {
  createTransaction,
  getAllTransactions,
} = require("../../controllers/transactions");

// api/transactions
router.get("/", authenticate, getAllTransactions);
router.post("/", authenticate, createTransaction);

module.exports = router;
