class UserSerializer < ActiveModel::Serializer
  attributes :id, :username
  
  has_many :photos
  has_many :collected_photos, through: :photo_users, serializer: PhotoSerializer
end
