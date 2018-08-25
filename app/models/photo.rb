class Photo < ApplicationRecord

  belongs_to :user
  has_many :photo_users, class_name: 'PhotoUser', foreign_key: :photo_id
  has_many :collectors, through: :photo_users, source: :user

  has_one_attached :image

  def thumbnail
    self.image.variant(resize:'100x100!').processed
  end
end
