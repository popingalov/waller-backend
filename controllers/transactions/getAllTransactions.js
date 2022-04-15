const { getTransactions } = require('../../helpers');
const { Transaction } = require('../../models');
const { ok } = require('../../libs/http-responses');

const getAllTransactions = async (req, res, next) => {
  const { page = 1, limit = 6 } = req.query;
  const { _id } = req.user;

  const allTransactions = await Transaction.find({ owner: _id }, '-createdAt -updatedAt');
  const transactions = await getTransactions(_id, page, limit);

  const currentBalance = allTransactions.at(-1).balance
  console.log(currentBalance);

  const responseObj = {
    transactions,
    currentBalance
  }
  
  !transactions ? res.status(ok.code).json([]) : res.status(ok.code).json(responseObj);
};

module.exports = getAllTransactions;
