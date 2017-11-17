"use strict";
const localdb_name = "storyteller-app";

module.exports = {
	productionEnv: {
		db: process.env.MONGODB_URI,
		secret: process.env.SECRET,
		auth: {
			user: process.env.GMAIL_EMAIL,
			pass: process.env.GMAIL_PWD
		}
	},
	localEnv:{
		db: `mongodb://localhost:27017/${localdb_name}`,
		secret: process.env.SECRET,
		auth: {
			user: process.env.GMAIL_EMAIL,
			pass: process.env.GMAIL_PWD
		}
	}
}