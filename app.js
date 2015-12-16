

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var dotenv = require('dotenv').load();

var pg = require('pg');
var session = require('express-session');
var pgSession = require('connect-pg-simple')(session);

var config = require('./oauth.js');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var index = require('./routes/index');
var users = require('./routes/user');
var accounts = require('./routes/account');
var dogs = require('./routes/dogs');

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

//send server side log to browser
var nodemonkey = require('node-monkey').start({host: "127.0.0.1", port:"50500"});

// view engine setup
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  partialsDir: ['views/partials/'],
  extname: '.hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// user session
app.use(session({
  store: new pgSession({
    pg : pg,                                     // Use global pg-module
    conString : process.env.DATABASE_URL,        // Connect using something else than default DATABASE_URL env variable
    tableName : 'session'                        // Use another table-name than the default "session" one
  }),
  saveUninitialized: true,
  secret: process.env.DB_SECRET,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

// user authenication
app.use(passport.initialize());
app.use(passport.session());

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// passport config
passport.use(new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL
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

// auth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  });

// app logout
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// run authentication
function ensureAuthenticated(req, res, next) {
  console.log("ensureAuthenticated",req.isAuthenticated());
  if (req.isAuthenticated()) { return next(); }
  res.render('index', { title: 'Express'});
}

// routes
app.use('/', index);
app.use('/users', ensureAuthenticated, users);
app.use('/account', ensureAuthenticated, accounts);
app.use('/dogs', ensureAuthenticated, dogs);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
