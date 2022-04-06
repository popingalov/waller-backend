const CreateError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { wrongData } = require('../../libs/http-responses');

const { SECRET_KEY } = process.env;
const { User } = require('../../models/users');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CreateError(wrongData.code, wrongData.status);
  }
  // if (!user.verify) {
  //   throw new CreateError(notVerify.code, notVerify.status);
  // }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new CreateError(wrongData.code, wrongData.status);
  }
  const payload = {
    id: user._id,
  };
  
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
    },
  });
};

module.exports = login;
