var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  console.log(req);
  console.log("why!")
  next();
})

/* GET users listing. */
router.get('/', function(req, res) {
  // res.send('respond with a resource');
  res.render('users',{title: "nothing yet"});

});

module.exports = router;
