const authRouter = require("./api/auth");
const transactionsRouter = require("./api/transactions");
const statisticsRouter = require("./api/statistics");
const userRouter = require("./api/users");
module.exports = {
  authRouter,
  transactionsRouter,
  statisticsRouter,
  userRouter,
};
