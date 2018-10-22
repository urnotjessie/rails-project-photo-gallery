function userListeners() {
  var user_id = parseInt($('.show-user').attr('id'));
  var current_user = $('li[data-user-id]').data('user-id');

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
      photoCards += '<a id="delete-photo" data-method="DELETE" href="/users/' + user_id + '/photos/' + photo["id"] + '">Delete photo</a>' + ' | ' +
      '<a id="update-caption" href="/users/' + user_id + '/photos/' + photo["id"] + '/edit">Update caption</a>' +
      '</div>';
    } else if(typeof current_user != "undefined") {
      photoCards += '<a id="add-to-collection" href="/photos/' + photo["id"] + '/photo_users/new">Add to my collection</a>' +
      '</div>';
    } else {
      photoCards += '</div>'
    }
  });

  $("#show-user-photos").html(photoCards);
}
