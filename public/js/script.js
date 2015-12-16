
$(function () {

var $editDogger = $('#editDogger'),
    $submitEdit = $('#submitEdit'),
    $dogDetails = $('.dog-detials'),
    $editDetails = $('.edit-details');

  $editDogger.on('click', function() {
    $editDogger.hide();
    $submitEdit.show();
    $dogDetails.hide();
    $editDetails.show();
  })

  $submitEdit.on('click', function() {
    var dogLookup = $('#dogID');
    var newName = $('input[name="name"]').val();
    var newBreed = $('input[name=breed]').val();
    var update = {id: dogLookup, name: newName, breed: newBreed};
    $submitEdit.hide();
    $editDogger.show();
    $editDetails.hide();
    $dogDetails.show();
    $.ajax('/dogs' + dogLookup, {
      data: update,
      type: 'PUT'
    })
    .done(function (response) {
      console.log(response);
      window.location = "/dogs/" + dogLookup
    })
  })

})
