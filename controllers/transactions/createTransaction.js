const CreateError = require('http-errors');

const { created } = require('../../libs/http-responses');
const { Transaction } = require('../../models');
const { calculateCurrentBalance, longOperation } = require('../../helpers');
const { getTransactions } = require('../../helpers');
const { dataError } = require('../../libs').HTTP_RESPONSES;

const createTransaction = async (req, res, next) => {
  const { _id } = req.user;
  const { date, amount, type } = req.body;

  const msPerDay = 86399999;

  const normalizedDate = date.split('.').reverse().join('.');
  const filter = new Date(normalizedDate).getTime();
  const comparedTimeStamp  = filter + msPerDay;

  const dateNow = new Date().getTime();

  if (comparedTimeStamp > dateNow) {
    throw new CreateError(dataError.code, dataError.status);
  }

  const transactions = await Transaction.find(
    { owner: _id },
    '-createdAt -updatedAt',
  ).sort({ dataFiltr: -1 });
  
  let currentBalance = 0;
  if (comparedTimeStamp < dateNow) {
    currentBalance = await longOperation({
      transactions,
      type,
      amount,
      filter,
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
    newFiltr: dateNow,
    balance: currentBalance || amount,
    owner: req.user._id,
  };

  await Transaction.create(newTransaction);
  const transactionsList = await getTransactions(_id);
  res.status(created.code).json(transactionsList);
};

module.exports = createTransaction;
