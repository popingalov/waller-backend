const { created } = require('../../libs/http-responses');
const { Transaction } = require('../../models');
const { calculateCurrentBalance, longOperation } = require('../../helpers');

const createTransaction = async (req, res, next) => {
  const { _id } = req.user;
  const { date, amount, type, dataFiltr: filter } = req.body;

  const transactions = await Transaction.find(
    { owner: _id },
    '-createdAt -updatedAt',
  ).sort({ dataFiltr: -1 });

  const dateTime = new Date().getTime();
  const dateNow = new Date(dateTime).toLocaleDateString();
  let currentBalance = 0;
  if (date < dateNow) {
    currentBalance = await longOperation({
      transactions,
      type,
      amount,
      filter,
      _id,
    });
  }

  if (date >= dateNow) {
    currentBalance = await calculateCurrentBalance({
      transactions,
      type,
      amount,
    });
  }

  const newTransaction = {
    ...req.body,
    balance: currentBalance,
    owner: req.user._id,
  };

  const result = await Transaction.create(newTransaction);
  res.status(created.code).json(result);
};

module.exports = createTransaction;
