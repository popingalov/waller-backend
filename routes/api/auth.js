const express = require('express');

const { authUrl } = require('../../libs');
const { authHandler, login } = require('../../controllers');

const { authValidator } = require('../../helpers');
const { controllerSync, valid } = require('../../middlewares');

const router = express.Router();

router.post(authUrl.auth, valid(authValidator), controllerSync(authHandler));
router.post(authUrl.login, valid(authValidator), controllerSync(login));
module.exports = router;
