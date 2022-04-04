const bcrypt = require('bcryptjs');
const CreateError = require('http-errors');
const {v4} = require('uuid');

const { User } = require('../../models');
const {
    saltDifficult,
    HTTP_RESPONSES: {
        inUse,
        created
    }
} = require('../../libs');

const authHandler = async (req, res, next) => {

    const { email, password, name} = req.body;
    const user = await User.findOne({email});
    
    if(user) {
        throw new CreateError(inUse.code, inUse.status)
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
}

module.exports = authHandler;
