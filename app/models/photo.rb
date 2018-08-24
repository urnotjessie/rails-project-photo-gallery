class Photo < ApplicationRecord
  has_one_attached :image
  
  belongs_to :creator, :class_name => "User"
  has_many :photo_users
  has_many :collectors, through: :photo_users, class_name: 'User', foreign_key: :collector_id
end
