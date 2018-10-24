class PhotoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  
  attributes :id, :caption, :created_at, :image, :total_collectors

  belongs_to :user, serializer: UserSerializer
  has_many :collectors, class_name: 'User', through: :photo_users, serializer: UserSerializer

  def created_at
    return object.created_at.strftime("%Y-%m-%d")
  end

  def image
    thumbnail = object.image.variant(resize:'300x300!').processed
    return {
      thumbnail:rails_representation_url(thumbnail, only_path: true),
      image: rails_blob_path(object.image, only_path: true)
    }
  end

  def total_collectors
    return object.collectors.length
  end

end
