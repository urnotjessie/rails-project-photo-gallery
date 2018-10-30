function photoListeners() {
  var photo_id = $('.show-photo').data('photo-id');
  var user_id = $('.show-photo').data('user-id');


  // create image element for photo show page
  $.get("/photos/" + photo_id + ".json", function(data) {

      var photo = data.image;
      var caption = data.caption;
      var user = data.user;
      var creation = data.created_at;

      var imageTag = '<image src="' + photo["thumbnail"] + '" class="img-thumbnail card-img-top"/><br>' +
      '<div class="card-body">' +
      '<br>[<strong>' + user.username + '</strong> - <span id="caption">' + caption + '</span>]' + '  ' +
      creation + '<br>' +
      '<p><a class="update-label">Update caption</a></p></div>';

      $(".show-photo-image").append(imageTag);
    });

    // eventlistener for clicking Update label on photo show page
    $(".show-photo-image").on("click", '.update-label', function() {

      var labelForm = '<form class="edit_photo" type="hidden" method="post" action="/photos/' + photo_id + '">' +
      '<input type="hidden" name="_method" value="patch">' +
      '<input type="text" name="photo[caption]" id="photo_caption" value="' + $("#caption")[0].innerHTML + '"/>' +
      '<input type="submit" value="submit" id="submit"/></form>';
      $(".show-photo-image").append(labelForm);
    });

}

// function photoListeners() {
//   var collection_id = $('.show-photo').data('collection-id');
//   var user_id = $('.show-photo').data('user-id');
//
//   // create image element for photo show page
//   $.get("/users/" + user_id + "/photo_users/" + collection_id + ".json", function(data) {
//
//       var photo = data.collected_photo;
//       var creator = data.creator;
//       var label = data.label;
//
//       var imageTag = '<image src="' + photo.image["thumbnail"] + '" class="img-thumbnail card-img-top"/><br>' +
//       '<div class="card-body">' +
//       '<br>[<strong>' + creator.username + '</strong> - ' + photo.caption + ']' + '  ' +
//       photo.created_at + '<br>' +
//       '<p>label: <span id="label">' + label + '</span>' + ' - ' +
//       '<a class="update-label">Update label</a></p></div>';
//
//       $(".show-photo-image").append(imageTag);
//     });
//
//     // eventlistener for clicking Update label on photo show page
//     $(".show-photo-image").on("click", '.update-label', function() {
//
//       var labelForm = '<form type="hidden" method="POST" action="#">' +
//       '<input type="text" value="' + $("#label")[0].innerHTML + '"/>' +
//       '<input type="submit" value="submit" id="submit"/></form>';
//       $(".show-photo-image").append(labelForm);
//     });
//
// }
