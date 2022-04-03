const CreateError = require("http-errors");
const { badValid } = require("../libs/http-responses");
const validation = (schema) => {
  return async (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new CreateError(badValid.code, badValid.status(error));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validation;
