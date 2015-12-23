
$(function () {

  var $editDogger = $('#editDogger'),
      $submitEdit = $('#submitEdit'),
      $dogDetails = $('.dog-detials'),
      $editDetails = $('.edit-details'),
      $removeDogger = $('button[title="Remove Dogger"]');

// edit dogger
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

// delte dog from database and list
  $removeDogger.on('click', function() {
    var dogIdToRemove = $(this).attr("data-id");
    $.ajax('/dogs/remove', {
      data: {id: dogIdToRemove},
      type: 'DELETE'
    })
    .done(function(response) {
      console.log("Removed dog: " + dogIdToRemove);
      location.reload();
    })
    .fail(function(error) {
      console.log(error)
    })
  })

// fix Facebook hash

if (window.location.hash && window.location.hash === "#_=_") {
  if (window.history && history.replaceState) {
    window.history.replaceState("", document.title, window.location.pathname);
  } else {
    // Prevent scrolling by storing the page's current scroll offset
    var scroll = {
      top: document.body.scrollTop,
      left: document.body.scrollLeft
    };
    window.location.hash = "";
    // Restore the scroll offset, should be flicker free
    document.body.scrollTop = scroll.top;
    document.body.scrollLeft = scroll.left;
  }
}

})
