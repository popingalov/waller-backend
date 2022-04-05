const express = require("express");

const { authUrl } = require("../../libs");
const { authHandler, login } = require("../../controllers");

const { userJoiSchema } = require("../../models/users");

const { controllerSync, valid } = require("../../middlewares");

const router = express.Router();
// api/
router.post(authUrl.auth, valid(userJoiSchema), controllerSync(authHandler));
router.post(authUrl.login, valid(userJoiSchema), controllerSync(login));
module.exports = router;
