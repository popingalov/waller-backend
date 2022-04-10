const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDoc = require('./sawgger.json')


const {
  authRouter,
  transactionsRouter,
  statisticsRouter,
  categoriesRouter,
} = require("./routes");
const { notFound, serverError } = require("./libs/http-responses");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Wallet API',
//       version: '1.0.0',
//     },
//     servers: [
//       {
//         url: 'http://www.localhost:4000'
//       },
//       {
//         url: 'https://dementrors-waller.herokuapp.com'
//       }
//     ]
//   },
//   apis: ['./routes/api/*.js'], // files containing annotations as above
// };

// const openapiSpecification = swaggerJsdoc(options);



app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/statistics", statisticsRouter);
app.use("/api/categories", categoriesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use((req, res) => {
  res.status(notFound.code).json({ message: notFound.status });
});

app.use((err, req, res, next) => {
  const { status = serverError.code, message = serverError.status } = err;

  res.status(status).json(message);
});

module.exports = app;
