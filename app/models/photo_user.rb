class PhotoUser < ApplicationRecord
  belongs_to :collected_photo, class_name: 'Photo', foreign_key: :photo_id
  belongs_to :collector, class_name: 'User', foreign_key: :collector_id

  validates_uniqueness_of :photo_id, scope: :collector_id

  scope :most_popular, -> (limit){ select("photo_id, count(collector_id) AS collectors_count, created_at").group("photo_id").order("collectors_count DESC, created_at DESC").limit(limit) }

  attr_accessor :other_label

end
