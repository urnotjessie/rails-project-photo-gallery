class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :photos

  has_many :collected_photos, through: :photo_users, serializer: PhotoSerializer

  def photos
    user_photos = []

    object.photos.each do |photo|
      user_photo = photo.attributes

      thumbnail = photo.image.variant(resize:'300x300!').processed
      user_photo[:image] = rails_representation_url(thumbnail, only_path: true)
      
      user_photo[:collectors] = photo.collectors.collect{|collect| collect.slice(:id, :username)}
      user_photos.push(user_photo)
    end

    return user_photos

  end
end
