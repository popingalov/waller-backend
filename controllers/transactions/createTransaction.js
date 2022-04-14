const CreateError = require('http-errors');

const { created } = require('../../libs/http-responses');
const { Transaction } = require('../../models');
const { calculateCurrentBalance, longOperation } = require('../../helpers');
const { getTransactions } = require('../../helpers');
const { dataError } = require('../../libs').HTTP_RESPONSES;

const createTransaction = async (req, res, next) => {
  const { _id } = req.user;
  const { date, amount, type } = req.body;

  const normalizedDate = date.split('.').reverse().join('.');
  const transactionTimeStamp = new Date(normalizedDate).getTime();

  const dateNow = new Date().getTime();

  if (transactionTimeStamp > dateNow) {
    throw new CreateError(dataError.code, dataError.status);
  }

  const transactions = await Transaction.find(
    { owner: _id },
    '-createdAt -updatedAt',
  ).sort({ dataFiltr: -1 });

  //   const dateTime = new Date().getTime();
  //   const dateNow = new Date(dateTime).toLocaleDateString();
  let currentBalance = 0;
  if (transactionTimeStamp < dateNow) {
    currentBalance = await longOperation({
      transactions,
      type,
      amount,
      date,
      _id,
    });
  } else {
    currentBalance = await calculateCurrentBalance({
      transactions,
      type,
      amount,
    });
  }

  const newTransaction = {
    ...req.body,
    balance: currentBalance || amount,
    owner: req.user._id,
  };

  await Transaction.create(newTransaction);
  const transactionsList = await getTransactions(_id);
  res.status(created.code).json(transactionsList);
};

module.exports = createTransaction;
