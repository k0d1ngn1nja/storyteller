"use strict";
const router = require('express').Router();
const v = require('../config/validation');
const userCntrl = require('../controllers/user');

router.get('/dashboard', v.isLoggedIn, userCntrl.dashboard);

module.exports = router;