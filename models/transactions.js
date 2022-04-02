const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = Schema(
  {
    date: {},
    type: {},
    category: {},
    comment: {},
    amount: {},
    balance: {},
    owner: {},
  },
  { versionKey: false, timestamps: true }
);

const addTransaction = Joi.object({
  date: Joi.string().required(),
  type: Joi.string().required(),
  category: Joi.string().required(),
  comment: Joi.string().required(),
  amount: Joi.string().required(),
  balance: Joi.string().required,
});

const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
  transactionJoiSchemas: {
    addTransaction,
  },
};
