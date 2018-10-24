class PhotoUserSerializer < ActiveModel::Serializer
  attributes :creator, :label

  def creator
    {
      id: Photo.find(object.collected_photo.id).user.id,
      username: Photo.find(object.collected_photo.id).user.username
    }
  end

  belongs_to :collector, class_name: 'User', serializer: UserSerializer
  belongs_to :collected_photo, class_name: 'Photo', serializer: PhotoSerializer
end
