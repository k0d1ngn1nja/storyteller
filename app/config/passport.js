"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/user');

// stores user id in session
passport.serializeUser(function(user, done){
	done(null, user.id);
});

// Retrieve stored user in the session
passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user);
	});
});

// LOCAL LOGIN
passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
	}, function(req, email, pwd, done){
	User.findOne({email}, function(err, user){
		if(err) return done(err);
		if(!user) return done(null, false, req.flash('errors', "No user found with those credentials."));
		if(!user.validatePWD(pwd)) return done(null, false, req.flash('errors', "Invalid email/password combination."));
		return done(null, user);
	});
}));

// FACEBOOK LOGIN
passport.use('facebook', new FacebookStrategy({
	clientID: process.env.FACEBOOK_APP_ID,
	clientSecret: process.env.FACEBOOK_APP_SECRET,
	callbackURL: "http://localhost:3000/auth/facebook/callback",
	profileFields: ['id', 'displayName', 'email'],
	passReqToCallback : true
}, function(req, token, refreshToken, profile, done){
	User.findOne({facebookId: profile.id}, function(err, user){
		if(user || err){
			return done(err, user);
		} else {
			let new_user = new User();

			new_user.email = profile._json.email;
			new_user.facebookId = profile.id;
			new_user.password = token;
			new_user.username = profile.displayName;
			new_user.photo = `https://graph.facebook.com/${profile.id}/picture?type=large`;

			new_user.save((err) =>{
				if(err) return console.log(err);
				done(null, new_user);
			});
		}
	});
}));

// GOOGLE LOGIN
passport.use('google', new GoogleStrategy(
{
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL: "/auth/google/callback",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true,
    proxy: true
  }, function(request, accessToken, refreshToken, profile, done){
    User.findOne({googleId: profile.id}, function(err, user){
    	if(err) return done(err);
			if(user) {
				return done(null, user);
			} else {

				let new_user = new User();

				new_user.email = profile.email;
				new_user.googleId = profile.id;
				new_user.password = accessToken;
				new_user.username = profile._json.nickname;
				new_user.photo = profile.photos[0].value;

				new_user.save((err) =>{
					if(err) return console.log(err);
					done(null, new_user);
				});
			}
    });
  }
));