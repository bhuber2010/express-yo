var express = require('express');
var router = express.Router();
var passport = require('../modules/passport_config');

// auth routes

// google
router.get('/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  });

// facebook
router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
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

module.exports = router;
