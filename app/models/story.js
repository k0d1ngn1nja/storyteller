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
		default: false
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
	creator: {
		id: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String,
		photo: String
	}
}, {timestamps: true});

storySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Story', storySchema);