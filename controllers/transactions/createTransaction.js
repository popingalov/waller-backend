const { created } = require("../../libs/http-responses");
const { Transaction } = require("../../models");

const createTransaction = async (req, res, next) => {
  const data = { ...req.body, owner: req.user._id };
  const result = await Transaction.create(data);
  res.status(created.code).json(result);
};

module.exports = createTransaction;
