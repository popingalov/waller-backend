const { Schema, model } =require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: {
      type: String
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        'Please fill a valid email address',
      ],
      unique: true,
    },
    balance: {
      type: Number
    },
    token: {
        type: String,
        default: '',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
}, {versionKey: false, timestamps: true, collection: 'users'})

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(5));
};

userSchema.methods.createToken = function () {
  const { SECRET_KEY } = process.env;
  const payload = {
    _id: this._id,
  };
  return jwt.sign(payload, SECRET_KEY);
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model('user', userSchema);

const userVarificationJoiSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = {
  User,
  userVarificationJoiSchema
};