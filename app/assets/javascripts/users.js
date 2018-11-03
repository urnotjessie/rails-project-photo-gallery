function userListeners() {
  var user_id = parseInt($('.show-user').attr('id'));
  var current_user = $('li[data-user-id]').data('user-id');

  $.get("/users/" + user_id + ".json", function(data) {
    photos = data.photos;
    loadPhotos(photos, user_id, current_user);
  });

  // eventlistener for photo clicking on user index page
  $("#show-user-photos").on("click", '.img-thumbnail', function() {
    var imageId = $(this).data('image-id');
    window.location.href = "/photos/" + imageId;
  });
}

// helper function - create elements for photos on user index page
function loadPhotos(photos, user_id, current_user) {
  var photoCards = "";

  photos.forEach(function(photo) {
    var captionForm;

    photoCards += '<div class="col-md-4 card img-thumbnail-card">' +
    '<image src="' + photo["image"]["thumbnail"] + '" class="img-thumbnail card-img-top" data-image-id="'+ photo["id"] +'"/><br>' +
    '<div class="card-body" id="caption">' +
    photo["caption"] +
    '</div>';

    if(user_id === current_user) {
      photoCards += '<a id="delete-photo" data-method="DELETE" href="/users/' + user_id + '/photos/' + photo["id"] + '">Delete photo</a>' + ' | ' +
      '<span><a id="update-caption-' + photo["id"] + '">Update caption</a></span>' +
      '</div>';
    } else if(typeof current_user != "undefined") {
      photoCards += '<a id="add-to-collection" href="/photos/' + photo["id"] + '/photo_users/new">Add to my collection</a>' +
      '</div>';
    } else {
      photoCards += '</div>'
    }

    showForm(photo);
  });

  $("#show-user-photos").html(photoCards);
}

function showForm(photo) {
  // append update-caption form on click
  $("#show-user-photos").on("click", '#update-caption-'+photo["id"], function() {
    
  // $(".update-caption").on("click", function() {

    var labelForm = '<form id="caption_form" action="/photos/' + photo["id"] + '">' +
    '<input type="text" name="photo[caption]" id="photo_caption" value="' + photo["caption"] + '"/>' +
    '<input type="submit" value="submit" id="submit" /></form>';

    $("#show-user-photos").find("#caption-form-"+photo["id"])
    $(this).parent().append(labelForm);
    // console.log($(this).text())
  });

  // submit handler for the form
  $(".caption-form").on("submit", '#caption_form', function() {
    event.preventDefault();

    var $form = $(this);
    var updatedCaption = $form.find("input[name='photo[caption]']").val();
    var patchData = {'photo_caption': updatedCaption};
    // var values = $(this).serialize();
    var url = $form.attr( "action" );

    $.ajax({
      headers: {'Accept':'application/json','Content-Type':'application/json'},
      url: url,
      type: 'patch',
      data: JSON.stringify(patchData),
      success: function(data) {
        alert("Caption updated!");
        $("#caption")[0].innerHTML = data["caption"];
        $("form").hide();
      }
    })
  })
}
