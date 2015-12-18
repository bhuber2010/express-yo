var express = require('express');
var router = express.Router();
var db = require('../modules/db_pg_promise.js')
var bodyParser = require('body-parser');


router.get('/', function(req, res) {
  console.log(req.session.passport.user.id);
  db.many("SELECT id, name, breed FROM dogs WHERE userID=${uID};",{uID: req.session.passport.user.id})
    .then(function(result){
      console.log(result);
      res.render('dogs', { title: 'Dogs', dogs: result });
    })
    .catch(function(error){
      res.json(error);
    })
});

router.get('/new', function(req, res) {
  res.render('newDog', { title: 'Give me a new dogger!', tagLine: 'Doggie shizzle', placeHolderName: "Lassie", placeHolderBreed: "Lab" })
});

router.post('/new', function(req, res) {
  db.none("INSERT INTO dogs (name, breed, session_sid, userID) VALUES (${name}, ${breed}, ${sid} ${userID});",{name: req.body.name, breed: req.body.breed, sid: req.sessionID, userID: req.session.passport.user.id})
  .then(function(result){
    res.redirect('/dogs');
  })
  .catch(function(error){
    res.json(error);
  })
})

router.get('/:id', function(req, res) {
  var dogId = req.params.id;
  db.one("SELECT id, name, breed FROM dogs WHERE id=$1;",[dogId])
  .then(function(dogResult){
    console.log(dogResult);
    res.render('aDog', { id: dogResult.id, name: dogResult.name, breed: dogResult.breed })
  })
  .catch(function(error){
    res.json(error);
  })
})

// router.get('/:id/edit', function(req, res)) {
//
// }

router.put('/:id', function(req, res) {
  db.none("UPDATE dogs SET name = ${name}, breed = ${breed} WHERE id = ${id};",{name: req.body.name, breed: req.body.breed, id: req.body.id})
  .then(function(result){
    res.end();
  })
  .catch(function(error){
    res.json(error);
  })
})

router.delete('/remove', function(req, res) {
  console.log(req);
  db.none("DELETE FROM dogs WHERE id = ${id};",{id: req.body.id})
  .then(function(result){
    console.log("successfully removed dog: " + req.body.id)
    res.end();
  })
  .catch(function(error){
    res.json(error);
  })
})

module.exports = router;
