class PhotoUserSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :collector, class_name: 'User', foreign_key: :collector_id
end
