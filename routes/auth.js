var express = require('express');
var router = express.Router();
var passport = require('../modules/passport_config');

// auth routes
router.get('/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  });


// app logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
