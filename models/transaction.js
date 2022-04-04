const { Schema, model } = require("mongoose");
const Joi = require("joi");

const numberValidationRules = Joi.number().min(0.01).precision(2).required();
// const dateRegExp = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]d{2}$/

const transactionSchema = Schema(
  {
    date: { type: String, required: true },
    type: {
      type: String,
      default: "costs",
      enum: ["costs", "incomes"],
      required: true,
    },
    category: { type: String, required: true },
    comment: { type: String, default: "комментарий отсутствует" },
    amount: { type: Number, required: true, min: 0.01 },
    balance: { type: Number, required: true, min: 0.01 },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { versionKey: false, timestamps: true }
);

const addTransaction = Joi.object({
  date: Joi.string().required(),
  type: Joi.string().valid("costs", "incomes"),
  category: Joi.string().required(),
  comment: Joi.string(),
  amount: numberValidationRules,
  balance: numberValidationRules,
});

const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
  transactionJoiSchemas: {
    addTransaction,
  },
};