"use strict";
const mongoose = require('mongoose');
const User = mongoose.model('User');

let userCntrl = {
	dashboard: function(req, res, next) {
		res.render('user/dashboard');
	}
}

module.exports = userCntrl;