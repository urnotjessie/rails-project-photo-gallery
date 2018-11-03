function photoListeners() {
  var currentId = $(".js-next").attr("data-id");
  captionForm(currentId);
  // $(".update-caption").on("click", function() {
  //   console.log($(".js-next").attr("data-id"));
  // });

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

      var photo = data.image;
      var caption = data.caption;
      var user = data.user;
      var creation = data.created_at;
      var collectors = data.collectors;

      var thisPhoto = new Photo(photo, caption, user, creation, collectors)
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
function Photo(image, caption, user, creation, collectors) {
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
