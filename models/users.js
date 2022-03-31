const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
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
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true },
);

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

const userJoiSchema = Joi.object({
  email: Joi.string()
    .pattern(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    )
    .required(),
  password: Joi.string().min(6).required(),
});
// const joiSchema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string()
//     .pattern(
//       /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
//     )
//     .required(),
//   phone: Joi.string().required(),
//   favorite: Joi.boolean(),
// });
const User = model('user', userSchema);

const userVarificationJoiSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = {
  User,
  userJoiSchema,
  userVarificationJoiSchema,
};
