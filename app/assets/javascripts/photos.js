function photoListeners() {

  $(".js-next").on("click", function() {
    var currentId = $(".js-next").attr("data-id");

    $.get("/photos/" + currentId + ".json", function(data) {
      var photo = data;
      var nextPhoto = photo.next_id;

      $(".js-next").attr("data-id", nextPhoto);

      showPhoto(nextPhoto);
      showForm(nextPhoto);
    });
  });
}

function showForm(photoId) {
  // append update-caption form on click
  $(".update-caption").on("click", function() {

    var labelForm = '<form id="caption_form" action="/photos/' + photoId + '">' +
    '<input type="text" name="photo[caption]" id="photo_caption" value="' + $("#caption")[0].innerHTML + '"/>' +
    '<input type="submit" value="submit" id="submit" /></form>';
    $(".caption-form").empty().append(labelForm);
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

function showPhoto(photoId) {
  // create image element for photo show page
  $.get("/photos/" + photoId + ".json", function(data) {

      var photo = data.image;
      var caption = data.caption;
      var user = data.user;
      var creation = data.created_at;
      var collectors = data.collectors;

      var imageTag = '<image src="' + photo["thumbnail"] + '" class="img-thumbnail card-img-top"/><br>' +
      '<div class="card-body">' +
      '<br>[<strong>' + user.username + '</strong> - <span id="caption">' + caption + '</span>]' + '  ' +
      creation + '<br>';

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
