var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  console.log("sessionID: ", req.sessionID );
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views += 1;
  }
  next();
})

router.get('/', function(req, res){
  console.log(req.user);
  res.render('account', { title: 'Express', user: req.user });
});

module.exports = router;

// , photo: req.user._json.image.url
