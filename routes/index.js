var express = require('express');
var router = express.Router();

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

router.get('/', function(req, res) {
  res.render('index', { title: 'Express', user: req.user });
});

module.exports = router;
