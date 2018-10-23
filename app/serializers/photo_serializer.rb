class PhotoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :caption, :created_at, :image, :collectors

  def image
    thumbnail = object.image.variant(resize:'300x300!').processed
    return {
      thumbnail:rails_representation_url(thumbnail, only_path: true),
      image: rails_blob_path(object.image, only_path: true)
    }
  end

  def collectors
    collectors_data = []
    
    object.collectors.each do |collector|
      attributes = {id: collector.id, username: collector.username}
      collectors_data.push(attributes)
    end

    return collectors_data
  end

end
