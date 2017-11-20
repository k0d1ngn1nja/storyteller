"use strict";
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Story = mongoose.model('Story');
const h = require('../helpers');

let storyCntrl = {
	index: function(req, res, next){
		Story.find({'status': 'public'}).then((stories) =>{
			res.render('story/index', {stories, h});
		});
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
		new_story.creator = {
			id: req.user._id,
			username: req.user.username,
			photo: req.user.photo
		}

		new_story.save().then((story) => {
			req.flash('progress', "New story was created");
			res.redirect(`/stories`);
		}).catch((err) =>{
			req.flash('errors', err.message);
			res.redirect('/stories/new');
		});
	},

	show: function(req, res, next){
		let success = req.flash('progress');
		let storyId = req.params.id;

		Story.findOne({_id: storyId}).then((story) =>{
			res.render('story/show', {success, story, h});
		}).catch((err) =>{
			req.flash('errors', err);
			res.redirect('/stories');
		});
	},

	edit: function(req, res, next){
		let storyId = req.params.id
		Story.findOne({_id: storyId}).then((story) =>{
			res.render('story/edit', {story, h});
		}).catch((err) =>{
			console.log(err);
		});
	},

	update: function(req, res, next){

	}
}

module.exports = storyCntrl;