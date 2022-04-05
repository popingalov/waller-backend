const express = require("express");
const router = express.Router();

const { authenticate } = require('../../middlewares')
const ctrl = require('../../controllers/users')

router.get("/current", authenticate, ctrl.current)

module.exports = router
