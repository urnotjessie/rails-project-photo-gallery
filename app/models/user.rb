class User < ApplicationRecord
  has_secure_password

  has_many :photos
  has_many :photo_users
  has_many :collected_photos, through: :photo_users, class_name: 'Photo', foreign_key: :photo_id
end
