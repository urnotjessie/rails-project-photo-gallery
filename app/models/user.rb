class User < ApplicationRecord
  has_secure_password

  has_many :photos
  has_many :photo_users, class_name: 'PhotoUser', foreign_key: :collector_id
  has_many :collected_photos, through: :photo_users, source: :collected_photo
end
