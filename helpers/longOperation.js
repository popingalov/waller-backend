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
  let testTime = 1;
  for (let i = 0; i <= transactionsLength; i++) {
    if (transactions[transactionsLength - i].dataFiltr > filter) {
      if (testTime === 1) {
        nawBalance =
          Number(transactions[transactionsLength + 1 - i]?.balance) || 0;
        // console.log('error', transactions[transactionsLength + 1 - i]);
        if (type === '-') {
          if (nawBalance < amount) {
            throw noPositiveBalanceError;
          }
          console.log('зачем?');
          nawBalance = Number(Number(nawBalance) - Number(amount));
          lastBalance = nawBalance;
          transactions[transactionsLength - i].balance = nawBalance;
          testTime = amount;
        }
        if (type === '+') {
          //   nawBalance = Number(Number(nawBalance) + Number(amount));

          lastBalance = nawBalance + Number(amount);
          console.log('lastBalance', lastBalance);
          console.log('nawBalance', nawBalance);
          transactions[transactionsLength - i].balance =
            lastBalance + transactions[transactionsLength - i].balance.amount;
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
      // transactions.balance = lastBalance;
      const nyy = await Transaction.findByIdAndUpdate(
        transactions[transactionsLength - i]._id,
        transactions[transactionsLength - i],
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
