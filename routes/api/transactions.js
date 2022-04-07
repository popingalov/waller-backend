const express = require("express");
const router = express.Router();
const { transactionJoiSchemas } = require("../../models");
const { authenticate, controllerSync, valid } = require("../../middlewares");
const {
  createTransaction,
  getAllTransactions,
} = require("../../controllers/transactions");

// api/transactions
router.get("/", authenticate, controllerSync(getAllTransactions));
router.get("/statistics", authenticate, controllerSync(getAllTransactions));
router.post(
  "/",
  authenticate,
  valid(transactionJoiSchemas.addTransaction),
  controllerSync(createTransaction)
);

module.exports = router;
