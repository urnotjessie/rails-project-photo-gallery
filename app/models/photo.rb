class Photo < ApplicationRecord

  belongs_to :user
  has_many :photo_users, class_name: 'PhotoUser', foreign_key: :photo_id
  has_many :collectors, through: :photo_users, source: :collector

  has_one_attached :image

  validates :caption, presence: true
  validate :image_type

  scope :most_recent, -> (limit) { order("created_at desc").limit(limit) }
  scope :ordered_by_date, -> { order("created_at desc") }

  def thumbnail
    self.image.variant(resize:'300x300!').processed
  end

  def collector_count
    self.collectors.count
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
