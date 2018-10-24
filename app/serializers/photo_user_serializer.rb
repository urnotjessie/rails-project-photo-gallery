class PhotoUserSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :collector, class_name: 'User', serializer: UserSerializer
  belongs_to :collected_photo, class_name: 'Photo', serializer: PhotoSerializer
end
