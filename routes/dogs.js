var express = require('express');
var router = express.Router();
var db = require('../modules/db_pg_promise.js')
var bodyParser = require('body-parser');
var knex = require('../db/knex');


router.get('/', function(req, res) {
  console.log(req.session.passport.user.id);
  // db.any("SELECT id, name, breed FROM dogs WHERE user_id=${uID};",{uID: req.session.passport.user.id})
  knex.select('id', 'name', 'breed')
  .where('user_id', req.session.passport.user.id)
  .from('dogs')
  .then(function(result){
    console.log(result);
    result.length ? noDogs = false : noDogs = "You got no Doggies boy";
    res.render('dogs', { title: 'Dogs', dogs: result, none: noDogs });
  })
  .catch(function(error){
    res.json(error);
  })
});

router.get('/new', function(req, res) {
  res.render('newDog', { title: 'Give me a new dogger!', tagLine: 'Doggie shizzle', placeHolderName: "Lassie", placeHolderBreed: "Lab" })
});

router.post('/new', function(req, res) {
  // db.none("INSERT INTO dogs (name, breed, session_sid, user_id) VALUES (${name}, ${breed}, ${sid}, ${uID});",{name: req.body.name, breed: req.body.breed, sid: req.sessionID, uID: req.session.passport.user.id})
  knex('dogs').insert({
    name: req.body.name,
    breed: req.body.breed,
    session_sid: req.sessionID,
    user_id: req.session.passport.user.id})
  .then(function(result){
    res.redirect('/dogs');
  })
  .catch(function(error){
    res.json(error);
  })
})

router.get('/:id', function(req, res) {
  var dogId = req.params.id;
  // db.one("SELECT id, name, breed FROM dogs WHERE id=$1;",[dogId])
  knex('dogs').first('id', 'name', 'breed').where('id', dogId)
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
  // db.none("UPDATE dogs SET name = ${name}, breed = ${breed} WHERE id = ${id};",{name: req.body.name, breed: req.body.breed, id: req.body.id})
  knex('dogs').update({
    name: req.body.name,
    breed: req.body.breed
  })
  .where('id', req.body.id)
  .then(function(result){
    res.end();
  })
  .catch(function(error){
    res.json(error);
  })
})

router.delete('/remove', function(req, res) {
  // db.none("DELETE FROM dogs WHERE id = ${id};",{id: req.body.id})
  knex('dogs')
  .where('id', req.body.id)
  .del()
  .then(function(result){
    console.log("successfully removed dog: " + req.body.id)
    res.end();
  })
  .catch(function(error){
    res.json(error);
  })
})

module.exports = router;
