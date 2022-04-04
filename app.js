const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { authRouter } = require('./routes');
const { URL } = require('./libs');
const transactionsRouter = require("./routes/api/transactions");
const { notFound, serverError } = require("./libs/http-responses");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/transactions", transactionsRouter);
app.use('/api/auth', authRouter);




app.use(URL.users, authRouter);

app.use((req, res) => {
  res.status(notFound.code).json({ message: notFound.status });
});

app.use((err, req, res, next) => {
  const { status = serverError.code, message = serverError.status } = err;

  res.status(status).json(message);
});

module.exports = app;
