const { Transaction } = require("../../models");

const getAllTransactions = async (req, res, next) => {
  const { page = 1, limit = 6 } = req.query;
  const skip = (page - 1) * limit;
  const { _id } = req.user;

  const transactions = await Transaction.find(
    { owner: _id },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "email");
  !transactions ? res.json([]) : res.json(transactions);
};

module.exports = getAllTransactions;
