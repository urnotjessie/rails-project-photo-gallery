/*
  user show page -- user's photos index page
*/
function userListeners() {
  var user_id = parseInt($('.show-user').attr('id'));

  $.get("/users/" + user_id + ".json", function(data) {
    photos = data.photos;
    loadPhotos(photos);
  });

  // eventlistener for photo clicking on user index page
  $("#show-user-photos").on("click", '.img-thumbnail', function() {
    var imageId = $(this).data('image-id');
    window.location.href = "/photos/" + imageId;
  });
}

// helper function - create elements for photos on user index page
function loadPhotos(photos) {
  var photoCards = "";

  photos.forEach(function(photo) {
    var thisPhoto = new Photo(photo.id, photo.image, photo.caption, photo.user, photo.creation, photo.collectors);
    photoCards += thisPhoto.showPhotoCard();
  });

  $("#show-user-photos").html(photoCards);
}


/*
  photo show page
*/
function photoListeners() {
  var currentId = $(".js-next").attr("data-id");
  captionForm(currentId);

  $(".js-next").on("click", function() {
    var currentId = $(".js-next").attr("data-id");

    $.get("/photos/" + currentId + ".json", function(data) {
      var photo = data;
      var nextPhoto = photo.next_id;

      $(".js-next").attr("data-id", nextPhoto);
      showPhoto(nextPhoto);
      captionForm(nextPhoto);
    });
  });

}

function captionForm(photoId) {
  // append update-caption form on click
  $(".update-caption").on("click", function() {

    var labelForm = '<form id="caption-form-' + photoId + '" action="/photos/' + photoId + '">' +
    '<input type="text" name="photo[caption]" id="photo_caption" value="' + $("#caption")[0].innerHTML + '"/>' +
    '<input type="submit" value="submit" id="submit" /></form>';
    $(".caption-form").empty().append(labelForm);
  });

  // submit handler for the form
  $(".caption-form").on("submit", '#caption-form-'+photoId, function() {
    event.preventDefault();

    var $form = $(this);
    var updatedCaption = $form.find("input[name='photo[caption]']").val();
    var patchData = {'photo_caption': updatedCaption};
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
    });
  });
}

function showPhoto(photoId) {
  // create image element for photo show page
  $.get("/photos/" + photoId + ".json", function(data) {
      var id = data.id;
      var photo = data.image;
      var caption = data.caption;
      var user = data.user;
      var creation = data.created_at;
      var collectors = data.collectors;

      var thisPhoto = new Photo(id, photo, caption, user, creation, collectors)
      var imageTag = thisPhoto.showPhoto();

      if(collectors.length != 0) {
        imageTag += 'collected by:';
        collectors.forEach(function(collector) {
          var thisCollector = new Collector(collector.id, collector.username);
          imageTag += thisCollector.showCollector();
        });
      };

      imageTag += '</div>';

      $(".show-photo-image").empty().append(imageTag);
    });
}

// declare collector object
function Collector(id, username) {
  this.id = id;
  this.username = username;
}
// prototype to display collectors
Collector.prototype.showCollector = function() {
  var showCollector = '';
  showCollector += ' <span class="underline"><a href="/users/' + this.id + '">' + this.username + '</a></span>';
  return showCollector;
}


// declare photo object
function Photo(id, image, caption, user, creation, collectors) {
  this.id = id;
  this.image = image;
  this.caption = caption;
  this.user  = user;
  this.creation = creation;
  this.collectors = collectors;
}
// prototype to display photo
Photo.prototype.showPhoto = function() {
  var showPhoto = '';

  showPhoto += '<image src="' + this.image["thumbnail"] + '" class="img-thumbnail card-img-top"/><br>' +
  '<div class="card-body">' +
  '<br>[<strong>' + this.user.username + '</strong> - <span id="caption">' + this.caption + '</span>]' + '  ' +
  this.creation + '<br>';

  return showPhoto;
}

Photo.prototype.showPhotoCard = function() {
  var current_user = $('li[data-user-id]').data('user-id');
  var showPhotoCard = '';

  showPhotoCard += '<div class="col-md-4 card img-thumbnail-card">' +
  '<image src="' + this.image["thumbnail"] + '" class="img-thumbnail card-img-top" data-image-id="'+ this.id +'"/><br>' +
  '<div class="card-body">' +
  this.caption +
  '</div>';

  if(this.user.id === current_user) {
    showPhotoCard += '<a id="delete-photo" data-method="DELETE" href="/users/' + this.user.id + '/photos/' + this.id + '">Delete photo</a>' +
    '</div>';
  } else if(typeof current_user != "undefined") {
    showPhotoCard += '<a id="add-to-collection" href="/photos/' + this.id + '/photo_users/new">Add to my collection</a>' +
    '</div>';
  } else {
    showPhotoCard += '</div>'
  }

  return showPhotoCard;
}
