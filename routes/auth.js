var express = require('express');
var router = express.Router();
var passport = require('../modules/passport_config');
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

// auth routes

// google
router.get('/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    insertUser(req.user);
    res.redirect('/account');
  });

// facebook
router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // console.log(req.user);
    insertUser(req.user);
    res.redirect('/account');
  });

// linkedIn
router.get('/linkedin',
  passport.authenticate('linkedin'),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

router.get('/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/'}),
  function(req, res) {
    console.log(req.user);
    insertUser(req.user);
    res.redirect('/account');
  });

//local
router.get('/login', function(req, res) {
  res.render('login', {});
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/auth/login' }),
  function(req, res) {
    // pull user off of req object
    res.redirect('/account');
  });

// app logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// sign up
router.get('/signup', function(req, res){
    res.render('signup');
});

router.post('/signup', function(req, res){
  knex('users').where('user_id', req.body.email).first()
  .then(function(user){
    if(user) {
      res.redirect('/auth/login?error=' + encodeURIComponent('That email is in use.'));
    } else {
      knex('users').insert({
        display_name: req.body.email,
        email: req.body.email,
        user_id: req.body.email,
        password_hash: bcrypt.hashSync(req.body.password, 10),
        times_seen: 1
      }).then(function(){
        res.redirect('/auth/login');
      });
    }
  });
});

// insert user into users table
function insertUser(userObj) {
  knex('users').where('user_id', userObj.id)
  .then(function(user){
    if (user.length === 0) {
      return knex('users').insert({
        display_name: userObj.displayName,
        user_id:      userObj.id,
        provider:     userObj.provider,
        times_seen:   1
      })
    } else {
      return knex('users').where('user_id', user[0].user_id).increment('times_seen', 1)
    }
  })
  .then(function(result){
    console.log(result)
  })
  .catch(function(error){
    console.error(error);
  })
}

module.exports = router;
