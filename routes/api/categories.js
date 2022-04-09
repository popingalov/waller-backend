const express = require('express');

const { authenticate, controllerSync, valid } = require("../../middlewares");
const { categoryJoiSchema } = require('../../models');

const { addCategory, getCategory } = require('../../controllers');

const router = express.Router()

router.post('/add', authenticate, valid(categoryJoiSchema), controllerSync(addCategory));
router.get('/', authenticate, controllerSync(getCategory));

module.exports = router;