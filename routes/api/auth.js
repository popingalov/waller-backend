const express = require("express");


const { authUrl } = require("../../libs");
const { authHandler, login } = require("../../controllers");

const { userJoiSchema } = require("../../models");
const { current } = require('../../controllers/users')
const { controllerSync, valid, authenticate } = require("../../middlewares");

const router = express.Router();
// api/
router.post(authUrl.auth, valid(userJoiSchema), controllerSync(authHandler));
router.post(authUrl.login, valid(userJoiSchema), controllerSync(login));
router.get(authUrl.current, authenticate, current)

module.exports = router;
