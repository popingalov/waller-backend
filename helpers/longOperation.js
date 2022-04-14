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

  //   console.log(transactions);
  let nawBalance = 0;
  for (let i = 0; i <= transactionsLength; i++) {
    console.log('error');
    if (transactions[transactionsLength - i].dataFiltr > filter) {
      nawBalance = Number(transactions[transactionsLength - i].balance);
      console.log(nawBalance);
      let testTime = 1;
      if (testTime === 1) {
        if (type === '-') {
          if (nawBalance < amount) {
            throw noPositiveBalanceError;
          }
          nawBalance = Number(Number(nawBalance) - Number(amount));
          lastBalance = nawBalance;
          transactions[transactionsLength - i].balance = nawBalance;
          testTime = 0;
        }
        if (type === '+') {
          nawBalance = Number(Number(nawBalance) + Number(amount));
          lastBalance = nawBalance;
          transactions[transactionsLength - i].balance = nawBalance;
          testTime = 0;
        }
      }

      if (testTime === 0) {
        if (type === '-') {
          nawBalance = Number(
            Number(nawBalance) -
              Number(transactions[transactionsLength - i].amount),
          );
          transactions[transactionsLength - i].balance = nawBalance;
        }
        if (type === '+') {
          nawBalance = Number(
            Number(nawBalance) +
              Number(transactions[transactionsLength - i].amount),
          );
          transactions[transactionsLength - i].balance = nawBalance;
        }
      }

      const nyy = await Transaction.findByIdAndUpdate(
        transactions[transactionsLength - i]._id,
        transactions,
        {
          new: true,
        },
      );
      console.log(nyy);
    }
  }
  console.log(lastBalance, 'lastBalance');
  return lastBalance;
};

module.exports = longOperation;
