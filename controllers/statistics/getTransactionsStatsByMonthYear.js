const { Transaction } = require('../../models');
const {
  getCurrentMonthYear,
  subtractSumPerCategory,
} = require('../../helpers');

const getTransactionsStatsByMonthYear = async (req, res, next) => {
  const { correctedCurrentMonth, currentYear } = getCurrentMonthYear();

  const { month = correctedCurrentMonth, year = currentYear } = req.query;

  const { _id } = req.user;

  const regExpMonthYear = new RegExp(`^\\d{2}\\.${month}\\.${year}$`);

  const transactions = await Transaction.find(
    { owner: _id, date: regExpMonthYear },
    '-createdAt -updatedAt',
  ).populate('owner', 'email');

  const transactionsStatsObj = subtractSumPerCategory(transactions);

  !transactions ? res.json([]) : res.json(transactionsStatsObj);
};

module.exports = getTransactionsStatsByMonthYear;
