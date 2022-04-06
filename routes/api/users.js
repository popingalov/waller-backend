const express = require('express');
const router = express.Router();

const { authenticate } = require('../../middlewares');
const { current, logout } = require('../../controllers/users');

router.get('/current', authenticate, current);
router.get('/logout', authenticate, logout);

module.exports = router;
