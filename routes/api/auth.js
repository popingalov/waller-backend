const express = require('express');

const { authUrl } = require('../../libs');
const { authHandler } = require('../../controllers');

// const {
//   userJoiSchema,
//   userVarificationJoiSchema,
// } = require('../../models/users');

// const {
//   controllerSync,
//   validation,
//   authenticate,
// } = require('../../middlewares');

// const { auth } = require('../../controllers');

const router = express.Router();

router.post(authUrl.auth, authHandler)

// router.post(
//   '/users/register',
//   validation(userJoiSchema),
//   controllerSync(auth.register),
// );

// router.post(
//   '/users/login',
//   validation(userJoiSchema),
//   controllerSync(auth.login),
// );
// router.get('/users/verify/:verifyToken', controllerSync(auth.verifyUser));

// router.post(
//   '/users/verify/',
//   validation(userVarificationJoiSchema),
//   controllerSync(auth.verifyUser),
// );

// router.get('/users/logout', authenticate, controllerSync(auth.logout));

// router.get('/users/current', authenticate, controllerSync(auth.getCurrentUser));

module.exports = router;
