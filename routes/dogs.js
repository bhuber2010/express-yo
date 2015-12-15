var express = require('express');
var router = express.Router();
var db = require('../modules/db_pg_promise.js')
var bodyParser = require('body-parser');


router.get('/', function(req, res) {
  db.many("SELECT id, name, breed FROM dogs;")
    .then(function(result){
      console.log(result);
      res.render('dogs', { title: 'Dogs', dogs: result });
    })
    .catch(function(error){
      res.json(error);
    })
});

router.post('/', function(req, res) {
  db.none("INSERT INTO dogs (name, breed) VALUES (${name}, ${breed});",{name: req.body.name, breed: req.body.breed})
  .then(function(result){
    res.end();
  })
  .catch(function(error){
    res.json(error);
  })
})

router.get("/:id", function(req, res) {
  var dogId = req.params.id;
  db.one("SELECT id, name, breed FROM dogs WHERE id=$1;",[dogId])
  .then(function(dogResult){
    console.log(dogResult);
    res.render('aDog', { title: dogResult.name, breed: dogResult.breed })
  })
  .catch(function(error){
    res.json(error);
  })
})

module.exports = router;
