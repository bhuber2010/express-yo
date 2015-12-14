var express = require('express');
var router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.render('index', { title: 'Express'});
}

router.use(function(req, res, next) {
  console.log(req.session);
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views += 1;
  }
  next();
})

/* GET home page. */

router.get('/',ensureAuthenticated, function(req, res) {
  res.redirect('/account');
});

module.exports = router;
