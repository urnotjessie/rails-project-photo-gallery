class Photo < ApplicationRecord

  belongs_to :user
  has_many :photo_users, class_name: 'PhotoUser', foreign_key: :photo_id
  has_many :collectors, through: :photo_users, source: :collector

  has_one_attached :image

  validates :caption, presence: true
  validate :image_type

  def thumbnail
    self.image.variant(resize:'300x300!').processed
  end

  private
  def image_type
    if image.attached? == false
      errors.add(:image, "is missing!")
    elsif !image.content_type.in?(%('image/jpeg image/png'))
      errors.add(:image, "needs to be a JPEG or PNG")
    end
  end
end
