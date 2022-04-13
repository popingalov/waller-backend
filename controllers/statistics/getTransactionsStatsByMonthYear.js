const { Transaction, Category } = require('../../models');
const {
  getCurrentMonthYear,
  subtractSumPerCategory,
} = require('../../helpers');

const getTransactionsStatsByMonthYear = async (req, res, next) => {
  const { correctedCurrentMonth, currentYear } = getCurrentMonthYear();

  const {
    month = correctedCurrentMonth,
    year = currentYear,
    leng = null,
  } = req.query;

  const { _id } = req.user;

  const regExpMonthYear = new RegExp(`^\\d{2}\\.${month}\\.${year}$`);

  const transactions = await Transaction.find(
    { owner: _id, date: regExpMonthYear },
    '-createdAt -updatedAt',
  ).populate('owner', 'email');

  const [categoryList] = await Category.find(
    { owner: _id },
    '-owner -createdAt -updatedAt',
  );

  const categoryLang = leng ? categoryList.en : categoryList.ru;
  const normalizedCategoryList = categoryLang.reduce((acc, category) => {
    acc[category.value] = category.color;
    return acc;
  }, {});
  console.log(transactions);
  const transactionsStatsObj = subtractSumPerCategory(
    transactions,
    normalizedCategoryList,
  );

  !transactions ? res.json([]) : res.json(transactionsStatsObj);
};

module.exports = getTransactionsStatsByMonthYear;
