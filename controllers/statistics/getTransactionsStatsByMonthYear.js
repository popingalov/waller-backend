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

  const transactionsPlus = await Transaction.find(
    { owner: _id, date: regExpMonthYear, type: "+" },
    '-createdAt -updatedAt',
  ).populate('owner', 'email');
  const transactionsMinus = await Transaction.find(
    { owner: _id, date: regExpMonthYear, type: "-" },
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

  const {sumPerCategoryArr: incomes, totalAmount:  incomesTotal } = subtractSumPerCategory(
    transactionsPlus,
    normalizedCategoryList,
  );

  const {sumPerCategoryArr: costs, totalAmount: costsTotal } = subtractSumPerCategory(
    transactionsMinus,
    normalizedCategoryList,
  );

  !transactionsPlus || !transactionsMinus ? res.json([]) : res.json({incomes, incomesTotal, costs, costsTotal});
};

module.exports = getTransactionsStatsByMonthYear;
