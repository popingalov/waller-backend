const { getTransactions } = require('../../helpers');
const { ok } = require('../../libs/http-responses');

const getAllTransactions = async (req, res, next) => {
  const { page = 1, limit = 6 } = req.query;
  const { _id } = req.user;

  const transactions = await getTransactions(_id, page, limit);
  
  !transactions ? res.status(ok.code).json([]) : res.status(ok.code).json(transactions);
};

module.exports = getAllTransactions;
