"use strict";
const mongoose = require('mongoose');
const config = require('../config');
const isProduction =(process.env.NODE_ENV === 'production');

mongoose.Promise = global.Promise;

if(isProduction){
	mongoose.connect(config.productionEnv.db, {useMongoClient: true}, function(err) {		
  	if (err) console.log(err);
  	console.log("Connected to remote database");
	});
} else {
	mongoose.connect(config.localEnv.db, {useMongoClient: true}, (err) => {
		if(err) console.log("Mongoose connection error occurred ", err);
		console.log('Connected to local database');
	});
}