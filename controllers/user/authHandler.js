const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const {v4} = require('uuid');

const { User } = require('../../models');
const { authValidator } = require('../../helpers');
const {
    saltDifficult,
    HTTP_RESPONSES: {
        badRequest,
        inUse,
        created
    }
} = require('../../libs');

const authHandler = async (req, res, next) => {
    try {
        const {error} = authValidator.validate(req.body);

        if(error) {
            next(createError(badRequest.code, error.message));
        }
        const { email, password, name} = req.body;
        const user = await User.findOne({email});
        
        if(user) {
            next(createError(inUse.code, inUse.status))
        }

        const salt = await bcrypt.genSalt(saltDifficult);
        const hashPass = await bcrypt.hash(password, salt);
        const verificationToken = v4();

        await User.create({email, name, password: hashPass, verificationToken});

        res.status(created.code).json({
            user: {
                email,
                status: created.status
            }
        })
    } catch (err) {
        next(err)
    }
}

module.exports = authHandler;
