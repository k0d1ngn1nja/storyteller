"use strict";
const mongoose = require('mongoose');
const User = mongoose.model('User');

let storyCntrl = {
	index: function(req, res, next){
		res.render('story/index');
	},

	new: function(req, res, next){
		res.render('story/new');
	},

	show: function(req, res, next){
		res.render('story/show');
	},

	edit: function(req, res, next){
		res.render('story/edit');
	}
}

module.exports = storyCntrl;