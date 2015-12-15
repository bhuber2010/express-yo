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

router.get('/', function(req, res){
  res.render('account', { title: 'Express', user: req.user, photo: req.user._json.image.url });
});

module.exports = router;
