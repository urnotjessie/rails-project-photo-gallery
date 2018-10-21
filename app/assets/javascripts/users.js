function userListeners() {
  var user_id = parseInt($('.show-user').attr('id'));
  var current_user = $('li[data-user-id]').data('user-id');
  debugger
  $.get("/users/" + user_id + ".json", function(data) {
    photos = data.photos;
    loadPhotos(photos, user_id, current_user);
  });
}

function loadPhotos(photos, user_id, current_user) {
  var photoCards = "";

  photos.forEach(function(photo) {

    photoCards += '<div class="col-md-4 card">' +
    '<image src="' + photo["image"] + '" class="img-thumbnail card-img-top"/><br>' +
    '<div class="card-body">' +
    photo["caption"] +
    '</div>';

    if(user_id === current_user) {
      photoCards += '<a href="#">Delete photo</a>' + ' | ' +
      '<a href="#">Update caption</a>' +
      '</div>';
    } else if(typeof current_user != "undefined") {
      photoCards += '<a href="#">Add to my collection</a>' +
      '</div>';
    } else {
      photoCards += '</div>'
    }

  });

  $("#show-user-photos").html(photoCards);
}
