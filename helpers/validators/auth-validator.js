const joi = require('joi')

const authValidator = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(5),
    name: joi.string().required().min(2)
})

module.exports = authValidator;
