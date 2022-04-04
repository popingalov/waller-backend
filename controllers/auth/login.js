const CreateError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const {badValid, wrongData, notVerify} = require('../../libs/http-responses')

const { SECRET_KEY } = process.env
const { User, userJoiSchema } = require("../../models/users");

const login = async (req, res, next) => {
  try {
    const { error } = userJoiSchema.validate(req.body);
    if (error) {
      throw new CreateError(badValid.code, badValid.status());
    }
    const { email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new CreateError(wrongData.code, wrongData.status);
    }
    if (!user.verify) {
      throw new CreateError(notVerify.code, notVerify.status);
    }
      const comparePassword = await bcrypt.compare(password, user.password);
      console.log(comparePassword);
    if (!comparePassword) {
      throw new CreateError(wrongData.code, wrongData.status);
      }
      const payload = {
          id: user._id
      }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })
    await User.findByIdAndUpdate(user._id, {token})
      res.json({
          token,
          user: {
        email,
      },
      })
  } catch (error) {
    next(error);
  }
}

module.exports = login