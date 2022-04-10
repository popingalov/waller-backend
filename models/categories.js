const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { pigLangDefaultCategories, enLangDefaultCategories } = require('../libs');

const categorySchema = new Schema({
    value: {
        type: String,
        required: true,
        maxlength: 70,
        default: ''
    }
});

const categoriesSchema = new Schema({
        ru: {
            type: [ categorySchema ],
            required: true,
            default: pigLangDefaultCategories
        },
        en: {
            type: [ categorySchema ],
            required: true,
            default: enLangDefaultCategories
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }
    },
    { versionKey: false, timestamps: true, collection: "category" }
);

const Category = model("category", categoriesSchema); 

const categoryJoiSchema = Joi.object({
    value: Joi.string().required().max(70),
    isEnglishVersion: Joi.boolean().default(false)
  });

module.exports = {
    Category,
    categoryJoiSchema
};