const { getTransactions, countPagesQuantity } = require('../../helpers');
const { ok } = require('../../libs/http-responses');

const getAllTransactions = async (req, res, next) => {
  const { page = 1, limit = 6 } = req.query;
  const { _id } = req.user;

  const allTransactions = await getTransactions(_id);
  const transactions = await getTransactions(_id, page, limit);

  const currentBalance = allTransactions[0].balance;
  const pages = countPagesQuantity({ allTransactions, limit });

  const responseObj = {
    transactions,
    currentBalance,
    pages,
  };

  !transactions
    ? res.status(ok.code).json([])
    : res.status(ok.code).json(responseObj);
};

module.exports = getAllTransactions;
