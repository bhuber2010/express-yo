var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views += 1;
  }
  next();
})

router.get('/', function(req, res){
  console.log(req.user);
  res.render('account', { title: 'Express', user: req.user, photo: req.user.photos[0].value });
});

module.exports = router;
