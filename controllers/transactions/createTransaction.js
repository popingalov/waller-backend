const { Transaction, transactionJoiSchemas } = require("../../models");
const createError = require("http-errors");
const { created, badValid } = require("./libs/http-responses");

const createTransaction = async (req, res, next) => {
  try {
    const { error } = transactionJoiSchemas.addContact.validate(req.body);
    if (error) {
      throw createError(badValid.code, badValid.status);
    }
    const data = { ...req.body, owner: req.user._id };
    const result = await Transaction.create(data);
    res.status(created.code).json(result);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = badValid.code;
    }
    next(error);
  }
};

module.exports = createTransaction;
