const Joi = require('joi');
const { Schema, model } = require('mongoose');
const randomColor = require('randomcolor');

const {
  pigLangDefaultCategories,
  enLangDefaultCategories,
} = require('../libs');
const newPigLangDefaultCategories = pigLangDefaultCategories.map(elem => ({
  ...elem,
  color: randomColor(),
}));
const newEnLangDefaultCategories = enLangDefaultCategories.map(elem => ({
  ...elem,
  color: randomColor(),
}));

const categorySchema = new Schema({
  value: {
    type: String,
    required: true,
    maxlength: 70,
    default: '',
  },
  color: {
    type: String,
    required: true,
    maxlength: 7,
  },
});

const categoriesSchema = new Schema(
  {
    ru: {
      type: [categorySchema],
      required: true,
      default: newPigLangDefaultCategories,
    },
    en: {
      type: [categorySchema],
      required: true,
      default: newEnLangDefaultCategories,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true, collection: 'category' },
);

const Category = model('category', categoriesSchema);

const categoryJoiSchema = Joi.object({
  value: Joi.string().required().max(70),
  color: Joi.string().required().max(70),
  isEnglishVersion: Joi.boolean().default(false),
});

module.exports = {
  Category,
  categoryJoiSchema,
};
