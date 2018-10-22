class UserSerializer < ActiveModel::Serializer
  # include Rails.application.routes.url_helpers
  attributes :id, :username
  has_many :photos

  has_many :collected_photos, through: :photo_users, serializer: PhotoSerializer
end
