"use strict";
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Story = mongoose.model('Story');
const h = require('../helpers');

let userCntrl = {
	dashboard: function(req, res, next) {
		Story.find({'creator.id': req.user.id}).then((stories) =>{
			res.render('user/dashboard', {stories, h});
		}).catch((err) =>{
			console.log(err);
		});
	}
}

module.exports = userCntrl;