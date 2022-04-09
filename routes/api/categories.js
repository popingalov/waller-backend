const express = require('express');

const { authenticate, controllerSync, valid } = require("../../middlewares");
const { categoryJoiSchema } = require('../../models');

const { add } = require('../../controllers');

const router = express.Router()

router.post('/add', authenticate, valid(categoryJoiSchema), controllerSync(add));

module.exports = router;