class PhotoUser < ApplicationRecord
  belongs_to :collected_photo, class_name: 'Photo', foreign_key: :photo_id
  belongs_to :collector, class_name: 'User', foreign_key: :collector_id

  validates_uniqueness_of :photo_id, scope: :collector_id

  attr_accessor :other_label

end
