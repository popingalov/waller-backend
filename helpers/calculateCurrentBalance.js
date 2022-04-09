const CreateError = require("http-errors");
const { badRequest } = require("../libs/http-responses");

const calculateCurrentBalance = ({ transactions, type, amount }) => {
  const noPositiveBalanceError = new CreateError(
    badRequest.code,
    "Insufficient funds! Make deposit first to have a positive balance."
  );

  const transactionsLength = transactions.length;

  if (!transactionsLength) {
    if (type === "-") {
      throw noPositiveBalanceError;
    } else {
      return amount;
    }
  }

  const lastTransaction = transactionsLength - 1;
  const previousBalance = transactions[lastTransaction].balance;

  if (type === "-" && previousBalance < amount) {
    throw noPositiveBalanceError;
  } else if (type === "-" && previousBalance > amount) {
    return previousBalance - amount;
  } else {
    return previousBalance + amount;
  }
};

module.exports = calculateCurrentBalance;
