function userListeners() {
  debugger
  var user_id = $('.show-user').attr('id');

  $.get("/users/" + user_id + ".json", function(data) {
    photos = data.photos;
    loadPhotos(photos);
  });
}

function loadPhotos(photos) {
  debugger
  var photoCards = "";
  photos.forEach(function(photo) {
    photoCards += '<div class="col-md-4 card">' + photo["id"] + ' - ' + photo["caption"] +
    '<image src="' + photo["image"] + '" class="img-thumbnail card-img-top"/>' +
    '</div>';
      });
  $("#show-user-photos").html(photoCards);
}
