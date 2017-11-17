"use strict";
const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const v = require('../config/validation');
const authCntrl = require('../controllers/auth');

router.get('/signup', authCntrl.signupGET);

router.get('/login', authCntrl.loginGET);

router.get('/auth/facebook', authCntrl.facebook);

router.get('/auth/facebook/callback', authCntrl.facebookCB);

router.get('/logout', authCntrl.logout);

router.get('/forgotpassword', authCntrl.forgot);

router.get('/reset/:token', authCntrl.reset);

router.post('/login', v.validateLogin, authCntrl.loginPOST);

router.post('/signup', v.validateSignup, authCntrl.signupPOST);

router.post('/forgotpassword', v.validatedForgotPwd, authCntrl.forgotPWD);

router.post('/reset/:token', v.validatedResetPwd, authCntrl.resetPWD);

module.exports = router;