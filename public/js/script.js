
$(function () {

var $editDogger = $('#editDogger'),
    $submitEdit = $('#submitEdit'),
    $dogDetails = $('.dog-detials'),
    $editDetails = $('.edit-details'),
    $removeDogger = $('a[title="Remove Dogger"]');

  $editDogger.on('click', function() {
    $editDogger.hide();
    $submitEdit.show();
    $dogDetails.hide();
    $editDetails.show();
  })

  $submitEdit.on('click', function() {
    var dogLookup = $('#dogID')[0].innerHTML;
    var newName = $('input[name="name"]').val();
    var newBreed = $('input[name=breed]').val();
    var update = {id: dogLookup, name: newName, breed: newBreed};
    $.ajax('/dogs/' + dogLookup, {
      data: update,
      type: 'PUT'
    })
    .done(function (response) {
      location.reload();
      $submitEdit.hide();
      $editDogger.show();
      $editDetails.hide();
      $dogDetails.show();
    })
  })

  $removeDogger.on('click', function() {
    var dogIdToRemove = $(this).attr("data-id");
    console.log(dogIdToRemove);
    $.ajax('/dogs/'+ dogIdToRemove, {
      data: {id: dogIdToRemove},
      type: 'DELETE'
    })
    .done(console.log("Removed dog: " + dogIdToRemove))
  })

})
