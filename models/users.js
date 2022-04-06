
const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [emailRegExp, "Please fill a valid email address"],
      unique: true,
    },
    name: {
      type: String,
    },
    balance: {
      type: Number,
    },
    token: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true, collection: "users" }
);

// userSchema.methods.setPassword = function (password) {
//   this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(5));
// };

// userSchema.methods.createToken = function () {
//   const { SECRET_KEY } = process.env;
//   const payload = {
//     _id: this._id,
//   };
//   return jwt.sign(payload, SECRET_KEY);
// };

// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

const userJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2),
});

const User = model("user", userSchema);

const userVerificationJoiSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = {
  User,
  userJoiSchema,
  userVerificationJoiSchema,
};

