var express = require('express');
var router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

router.get('/', ensureAuthenticated, function(req, res){
  res.render('account', { title: 'Express', user: req.user, photo: req.user._json.image.url });
});

module.exports = router;
