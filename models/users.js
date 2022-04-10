
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
      minlength: 2
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

