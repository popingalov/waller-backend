const { created } = require('../../libs/http-responses');
const { Transaction } = require('../../models');
const { calculateCurrentBalance } = require('../../helpers');

const createTransaction = async (req, res, next) => {
  const { _id } = req.user;
  const { amount, type } = req.body;

  const transactions = await Transaction.find(
    { owner: _id },
    '-createdAt -updatedAt',
  );
  const currentBalance = calculateCurrentBalance({
    transactions,
    type,
    amount,
  });

  const newTransaction = {
    ...req.body,
    balance: currentBalance,
    owner: req.user._id,
  };

  const result = await Transaction.create(newTransaction);
  res.status(created.code).json(result);
};

module.exports = createTransaction;
