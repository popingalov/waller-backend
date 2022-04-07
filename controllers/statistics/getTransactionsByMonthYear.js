const { Transaction } = require("../../models");

const getAllTransactions = async (req, res, next) => {
  const { month, year } = req.query;
  const { _id } = req.user;

  const transactions = await Transaction.find(
    { owner: _id },
    "-createdAt -updatedAt",
    {}
  ).populate("owner", "email");
  !transactions ? res.json([]) : res.json(transactions);
};

module.exports = getAllTransactions;
