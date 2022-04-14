const { Schema, model } = require('mongoose');
const Joi = require('joi');

const transactionSchema = Schema(
  {
    date: { type: String, required: true },
    dataFiltr: { type: Number, required: true },
    type: {
      type: String,
      enum: ['-', '+'],
      required: true,
    },
    category: { type: String, required: true },
    comment: { type: String, default: '' },
    amount: { type: Number, required: true, min: 0.01 },
    balance: { type: Number, min: 0.01 },
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  { versionKey: false, timestamps: true, collection: 'transactions' },
);

const addTransaction = Joi.object({
  date: Joi.string().required(),
  dataFiltr: Joi.number(),
  type: Joi.string().valid('-', '+'),
  category: Joi.string().required(),
  comment: Joi.string(),
  triger: Joi.boolean(),
  amount: Joi.number().min(0.01).precision(2).required(),
});

const Transaction = model('transaction', transactionSchema);

module.exports = {
  Transaction,
  transactionJoiSchemas: {
    addTransaction,
  },
};
