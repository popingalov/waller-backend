const express = require('express');

const { authUrl } = require('../../libs');
const { authHandler } = require('../../controllers');

const {userJoiSchema} = require('../../models/users');

const { controllerSync, valid } = require('../../middlewares');
const ctrl = require('../../controllers/auth');


const router = express.Router();

router.post(authUrl.auth, authHandler);
router.post('users/login', valid(userJoiSchema), controllerSync(ctrl.login));
module.exports = router;
