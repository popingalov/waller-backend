const bcrypt = require('bcryptjs');
const CreateError = require('http-errors');
const {v4} = require('uuid');

const { User, Category } = require('../../models');
const {
    saltDifficult,
    HTTP_RESPONSES: {
        inUse,
        created
    }
} = require('../../libs');

const authHandler = async (req, res, next) => {

    const { email, password, name} = req.body;
    const tremedEmail = email.trim();
    
    const user = await User.findOne({email: tremedEmail});
    
    if(user) {
        throw new CreateError(inUse.code, inUse.status)
    }
    
    const salt = await bcrypt.genSalt(saltDifficult);
    const hashPass = await bcrypt.hash(password, salt);
    const verificationToken = v4();
    const newUser = await User.create({email: tremedEmail, name, password: hashPass, verificationToken});

    await Category.create({owner: newUser._id});


    res.status(created.code).json({
        user: {
            email,
            status: created.status
        }
    })
}

module.exports = authHandler;
