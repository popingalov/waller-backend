const CreateError = require('http-errors');
const { badRequest } = require('../libs/http-responses');
const { Transaction } = require('../models');
const longOperation = async ({ transactions, type, amount, filter }) => {
  const noPositiveBalanceError = new CreateError(
    badRequest.code,
    'Insufficient funds! Make deposit first to have a positive balance.',
  );
  const transactionsLength = transactions.length - 1;
  let lastBalance = 0;
  if (!transactionsLength) {
    if (type === '-') {
      throw noPositiveBalanceError;
    } else {
      return amount;
    }
  }

  let nawBalance = 0;
  let testTime = 1;
  for (let i = 0; i <= transactionsLength; i++) {
    const test = transactionsLength - i;
    const testType = transactions[test].type;
    if (transactions[test].dataFiltr > filter) {
      if (testTime === 1) {
        nawBalance = Number(transactions[test + 1]?.balance) || 0;

        if (type === '-') {
          if (nawBalance < amount) {
            throw noPositiveBalanceError;
          }
          lastBalance = nawBalance > 0 && nawBalance - Number(amount);
          nawBalance = nawBalance > 0 ? lastBalance : Number(amount);
          transactions[test - 1].balance = nawBalance - Number(amount);
          testTime = 0;
        }
        if (type === '+') {
          lastBalance = nawBalance > 0 && nawBalance + Number(amount);
          nawBalance = nawBalance > 0 ? lastBalance : Number(amount);
          transactions[test - 1].balance = nawBalance + Number(amount);
          testTime = 0;
        }
      }

      if (testTime === 0) {
        if (testType === '-') {
          nawBalance = Number(
            Number(nawBalance) - Number(transactions[test].amount),
          );
          transactions[test].balance = nawBalance;
        }
        if (testType === '+') {
          nawBalance = Number(
            Number(nawBalance) + Number(transactions[test].amount),
          );
          transactions[test].balance = nawBalance;
        }
      }
      // transactions.balance = lastBalance;
      const nyy = await Transaction.findByIdAndUpdate(
        transactions[test]._id,
        transactions[test],
        {
          new: true,
        },
      );
      //   console.log(nyy);
    }
  }
  //   console.log(lastBalance, 'lastBalance');
  return lastBalance;
};

module.exports = longOperation;
