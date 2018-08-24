class PhotoUser < ApplicationRecord
  belongs_to :collected_photo, class_name: 'Photo'
  belongs_to :collector, class_name: 'User'
end
