const joi = require('joi')

const authValidator = joi.object({
    email: joi.string()
    .pattern(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    )
    .required(),
    name: joi.string().min(2),
    password: joi.string().min(6).required()
})

module.exports = authValidator;
