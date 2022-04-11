const express = require('express');

const { authenticate, controllerSync, valid } = require('../../middlewares');
const { categoryJoiSchema } = require('../../models');

const {
  addCategory,
  getCategory,
  removeCategory,
} = require('../../controllers');

const router = express.Router();

router.post(
  '/',
  authenticate,
  valid(categoryJoiSchema),
  controllerSync(addCategory),
);
router.get('/', authenticate, controllerSync(getCategory));
router.patch('/:categoryId', authenticate, controllerSync(removeCategory));

module.exports = router;
