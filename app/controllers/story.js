"use strict";
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Story = mongoose.model('Story');

let storyCntrl = {
	index: function(req, res, next){
		res.render('story/index');
	},

	new: function(req, res, next){
		let errors = req.flash('errors');
		res.render('story/new', {errors});
	},

	create: function(req, res, next){
		let allowcomment;
		req.body.allowcomment ? allowcomment = true : allowcomment = false;

		let new_story = new Story();
		new_story.title = req.body.title;
		new_story.status = req.body.status;
		new_story.allowcomment = allowcomment;
		new_story.storyText = req.body.storyText;
		new_story.user = req.user.id;

		new_story.save().then((story) => {
			req.flash('progress', "New story was created");
			res.redirect(`/stories/${story._id}/show`);
		}).catch((err) =>{
			req.flash('errors', err);
			res.redirect('back');
		});
	},

	show: function(req, res, next){
		let success = req.flash('progress');
		res.render('story/show', {success});
	},

	edit: function(req, res, next){
		res.render('story/edit');
	}
}

module.exports = storyCntrl;