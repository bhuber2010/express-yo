var express = require('express');
var router = express.Router();


router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { title: 'Express', user: req.user }));
});

module.exports = router;
