class User < ApplicationRecord
  has_secure_password

  has_many :photos
  has_many :photo_users, class_name: 'PhotoUser', foreign_key: :collector_id
  has_many :collected_photos, through: :photo_users, source: :collected_photo


  validates :username, :email, presence: true
  validates :email, uniqueness: true
  validates :password_digest, length: { minimum: 8 }

  def labels
    labels = self.photo_users.reject {|collect| collect.label == nil || collect.label == ""}.collect{|collect| collect.label}
    labels = labels.uniq
  end
end
