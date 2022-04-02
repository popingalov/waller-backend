const { Transaction } = require("../../models");

const getAllTransactions = async (req, res, next) => {
  try {
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

    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllTransactions;
