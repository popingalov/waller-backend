const { Category } = require("../../models");
const CreateError = require("http-errors");

const { created, notFound } = require("../../libs").HTTP_RESPONSES;

console.log(created);

const add = async (req, res, next) => {
  const { _id } = req.user;
  const { value, isEnglishVersion } = req.body;

  const newCategory = {
    value: value,
  };

  const [categoryList] = await Category.find({ owner: _id });

  if (!categoryList) {
    throw new CreateError(notFound.code, notFound.status);
  }

  isEnglishVersion
    ? categoryList.en.push(newCategory)
    : categoryList.ru.push(newCategory);

  const newCategoryList = await Category.findByIdAndUpdate(
    categoryList._id,
    categoryList,
    { new: true }
  );

  res.status(created.code).json({
    categoryList: newCategoryList,
    status: created.status,
  });
};

module.exports = add;
