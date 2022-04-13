const { Category } = require('../../models');
const CreateError = require('http-errors');

const { ok, notFound } = require('../../libs').HTTP_RESPONSES;

const getCategory = async (req, res, next) => {
  const { _id } = req.user;

  const [categoryList] = await Category.find(
    { owner: _id },
    '-owner -createdAt -updatedAt',
  );

  if (!categoryList) {
    throw new CreateError(notFound.code, notFound.status);
  }

  res.status(ok.code).json({
    categoryList: categoryList,
    status: ok.status,
  });
};

module.exports = getCategory;
