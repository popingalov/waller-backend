const { badValid } = require("../libs/http-responses");

const controllerSync = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      if (error.message.includes("validation failed")) {
        error.status = badValid.code;
      }
      next(error);
    }
  };
};

module.exports = controllerSync;
