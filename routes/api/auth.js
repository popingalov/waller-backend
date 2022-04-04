const express = require('express');

const { authUrl } = require('../../libs');
const { authHandler } = require('../../controllers');

const {userJoiSchema} = require('../../models/users');
const { authValidator } = require('../../helpers');

const { controllerSync, valid } = require('../../middlewares');
const ctrl = require('../../controllers/auth');


const router = express.Router();

router.post(authUrl.auth, valid(authValidator), controllerSync(authHandler));
router.post(authUrl.login, valid(userJoiSchema), controllerSync(ctrl.login));
module.exports = router;
