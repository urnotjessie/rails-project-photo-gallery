function photoListeners() {
  var collection_id = $('.show-photo').data('collection-id');
  var user_id = $('.show-photo').data('user-id');

  // create image element for photo show page
  $.get("/users/" + user_id + "/photo_users/" + collection_id + ".json", function(data) {

      var photo = data.collected_photo;
      var creator = data.creator;
      var label = data.label;

      var imageTag = '<image src="' + photo.image["thumbnail"] + '" class="img-thumbnail card-img-top"/><br>' +
      '<div class="card-body">' +
      '<br>[<strong>' + creator.username + '</strong> - ' + photo.caption + ']' + '  ' +
      photo.created_at + '<br>' +
      '<p>label: ' + label + '</p></div>';

      $(".show-photo-image").append(imageTag);
    });
}
