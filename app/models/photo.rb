class Photo < ApplicationRecord

  belongs_to :user
  has_many :photo_users
  has_many :collectors, through: :photo_users, class_name: 'User', foreign_key: :collector_id

  has_one_attached :image

  def thumbnail
    self.image.variant(resize:'100x100!').processed
  end
end
