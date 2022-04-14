const CreateError = require('http-errors');

const { created } = require('../../libs/http-responses');
const { Transaction } = require('../../models');
const { calculateCurrentBalance, longOperation } = require('../../helpers');
const { getTransactions } = require('../../helpers');
const { dataError } = require('../../libs').HTTP_RESPONSES;

const createTransaction = async (req, res, next) => {
  const { _id } = req.user;
  const { date, amount, type } = req.body;

  //   const msPerDay = 86399999;

  //   const filter = new Date(normalizedDate).getTime();
  //   const comparedTimeStamp = filter + msPerDay;
  //   console.log(filter);

  const normalizedDate = date.split('.').reverse().join('.');
  //
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const currentDate = dd + '.' + mm + '.' + yyyy;
  const normilizedCurrentDate = currentDate.split('.').reverse().join('.');
  //
  const timForLongOperation = new Date(normalizedDate).getTime();
  //
  console.log(new Date(normalizedDate).getTime() < today.getTime());

  if (normalizedDate > normilizedCurrentDate) {
    throw new CreateError(dataError.code, dataError.status);
  }

  const transactions = await Transaction.find(
    { owner: _id },
    '-createdAt -updatedAt',
  ).sort({ dataFiltr: +1 });

  let currentBalance = 0;
  if (normalizedDate < normilizedCurrentDate) {
    currentBalance = await longOperation({
      transactions,
      type,
      amount,
      filter: timForLongOperation,
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
    dataFiltr: today.getTime(),
    balance: currentBalance || amount,
    owner: req.user._id,
  };

  await Transaction.create(newTransaction);
  const transactionsList = await getTransactions(_id);
  res.status(created.code).json(transactionsList);
  res.status(created.code).json('transactionsList');
};

module.exports = createTransaction;
