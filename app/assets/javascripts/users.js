function userListeners() {
  debugger
  var user_id = $('.show-user').attr('id');

  $.get("/users/" + user_id + ".json", function(data) {

    photos = data;
    loadPhotos(photos)
  })
}

function loadPhotos(data) {
  $("#show-user-photos").append('append photos')
}
