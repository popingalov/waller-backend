const CreateError = require('http-errors');

const { created } = require('../../libs/http-responses');
const { Transaction } = require('../../models');
const { calculateCurrentBalance, longOperation } = require('../../helpers');
const { getTransactions, countPagesQuantity } = require('../../helpers');
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
  //
  const normilizedCurrentDate = currentDate.split('.').reverse().join('.');
  //
  let helper = today.getTime();
  //
  //   console.log(timForLongOperation < today.getTime());
  const calc = function () {
    const timForLongOperation = new Date(normalizedDate).getTime();

    const result = today.getTime() - timForLongOperation;
    const result2 = Math.abs(result / 2);
    const helper = today.getTime();
    return helper - result + result2;
  };
  if (normalizedDate > normilizedCurrentDate) {
    throw new CreateError(dataError.code, dataError.status);
  }

  const allTransactions = await Transaction.find(
    { owner: _id },
    '-createdAt -updatedAt',
  )
  const transactions = await Transaction.find(
    { owner: _id },
    '-createdAt -updatedAt',
  ).sort({ dataFiltr: -1 });
//   console.log(normalizedDate < normilizedCurrentDate);
  let currentBalance = 0;
  if (normalizedDate < normilizedCurrentDate) {
    helper = calc();
    // console.log('долгая');
    currentBalance = await longOperation({
      transactions,
      type,
      amount,
      filter: calc(),
      _id,
    });
  } else {
    // console.log('короткая');
    currentBalance = await calculateCurrentBalance({
      transactions,
      type,
      amount,
    });
    //
  }

  const pages = countPagesQuantity({ allTransactions });

  const newTransaction = {
    ...req.body,
    dataFiltr: helper,
    balance: currentBalance || amount,
    owner: req.user._id,
  };

  await Transaction.create(newTransaction);
  const transactionsList = await getTransactions(_id);

  const responseObj = {
    transactionsList,
    pages,
  };

  res.status(created.code).json(responseObj);
};

module.exports = createTransaction;
