var authID = require('../oauth.js');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;



// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// streatesies config
passport.use(new GoogleStrategy({
  clientID: authID.google.clientID,
  clientSecret: authID.google.clientSecret,
  callbackURL: authID.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: authID.facebook.clientID,
    clientSecret: authID.facebook.clientSecret,
    callbackURL: authID.facebook.callbackURL,
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

passport.use(new LocalStrategy(
  function(username, password, done) {
     db.one()
      .then(function(user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
  }
));

module.exports = passport;
