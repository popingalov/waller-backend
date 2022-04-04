const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');

const {userJoiSchema} = require('../../models/users');

const {controllerSync, valid } = require('../../middlewares');

router.post('users/login', valid(userJoiSchema), controllerSync(ctrl.login))


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
