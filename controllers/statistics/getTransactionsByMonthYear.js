const { Transaction } = require("../../models");

const getTransactionsStatsByMonthYear = async (req, res, next) => {
  const { month, year } = req.query;
  const { _id } = req.user;

  let regexp = new RegExp(`<${tag}>`);

  const transactions = await Transaction.find(
    { owner: _id, date:  },
    "-createdAt -updatedAt",
    {}
  ).populate("owner", "email");

  !transactions ? res.json([]) : res.json(transactions);
};

module.exports = getTransactionsStatsByMonthYear;

// 

function createSearchQueryRegExp ( month, year ) {

}

function subtractSumPerCategory (  ) {

}


