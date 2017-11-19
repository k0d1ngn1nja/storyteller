"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let storySchema = new Schema({
	title: {
		type: String,
		unique: true,
		index: true,
		minlength: 5,
		required: [true, "Story title is required."],
	},
	status: {
		type: String,
		default: 'draft'
	},
	image: String,
	storyText: String,
	allowcomment: {
		type: Boolean,
		default: true
	},
	comments: [{
		text:{
			type: String,
			required: true
		},
		commentUser:{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	}, {timestamp: true}],
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
}, {timestamp: true});

storySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Story', storySchema, 'Stories');