const { created } = require('../../libs/http-responses');
const { Transaction } = require('../../models');
const { calculateCurrentBalance, longOperation } = require('../../helpers');

const createTransaction = async (req, res, next) => {
  const { _id } = req.user;
  const { date, amount, type, dataFiltr: filter, triger = null } = req.body;

  const transactions = await Transaction.find(
    { owner: _id },
    '-createdAt -updatedAt',
  ).sort({ dataFiltr: -1 });

  //   const dateTime = new Date().getTime();
  //   const dateNow = new Date(dateTime).toLocaleDateString();
  let currentBalance = 0;
  if (triger) {
    currentBalance = await longOperation({
      transactions,
      type,
      amount,
      filter,
      _id,
    });
  }

  if (!triger) {
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

  const transaction = await Transaction.create(newTransaction);

  res.status(created.code).json(transaction);
};

module.exports = createTransaction;
