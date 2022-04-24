const { getTransactions, countPagesQuantity } = require('../../helpers');
const { ok } = require('../../libs/http-responses');
const { Transaction } = require('../../models');
const getAllTransactions = async (req, res, next) => {
  const { page = 1, limit = 6 } = req.query;
  const { _id } = req.user;
  const allTransactions = await Transaction.find(
    { owner: _id },
    '-createdAt -updatedAt',
  )
    .sort({ dataFiltr: -1 })
    .populate('owner', 'email');
  const transactions = await getTransactions(_id, page, limit);

  const currentBalance = allTransactions[0].balance;
  const pages = countPagesQuantity({ allTransactions, limit });
  const yearAndMonth = allTransactions.reduce((acc, curr) => {
    const helpMonth = curr.date.slice(3, 5);
    const helpYear = curr.date.slice(6);

    if (!acc[helpYear]) {
      acc[helpYear] = [];
    }

    if (!acc[helpYear].includes(helpMonth)) {
      acc[helpYear].push(helpMonth);
    }

    return acc;
  }, {});

  const responseObj = {
    transactions,
    currentBalance,
    pages,
    yearAndMonth,
  };

  !transactions
    ? res.status(ok.code).json([])
    : res.status(ok.code).json(responseObj);
};

module.exports = getAllTransactions;
