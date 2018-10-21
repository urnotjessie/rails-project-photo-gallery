class PhotoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :caption, :image

  def image
    thumbnail = object.image.variant(resize:'300x300!').processed
    return rails_representation_url(thumbnail, only_path: true)
  end
end
