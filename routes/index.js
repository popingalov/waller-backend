const authRouter = require("./api/auth");
const statisticsRouter = require("./api/statistics");
const transactionsRouter = require("./api/transactions");
const categoriesRouter = require('./api/categories');

module.exports = {
  authRouter,
  statisticsRouter,
  transactionsRouter,
  categoriesRouter
};
