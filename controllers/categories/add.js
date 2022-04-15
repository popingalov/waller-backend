const { Category } = require('../../models');
const CreateError = require('http-errors');
const randomColor = require('randomcolor');
const { created, notFound } = require('../../libs').HTTP_RESPONSES;

const addCategory = async (req, res, next) => {
  const { _id } = req.user;
  const { value, isEnglishVersion, type } = req.body;

  const color = randomColor();
  const newCategory = {
    value,
    color,
    type,
  };

  const [categoryList] = await Category.find({ owner: _id });

  if (!categoryList) {
    throw new CreateError(notFound.code, notFound.status);
  }

  isEnglishVersion
    ? categoryList.en.push(newCategory)
    : categoryList.ru.push(newCategory);

  await Category.findByIdAndUpdate(categoryList._id, categoryList, {
    new: true,
  });

  res.status(created.code).json({
    newCategory,
    status: created.status,
  });
};

module.exports = addCategory;
