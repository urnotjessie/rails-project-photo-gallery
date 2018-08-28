class PhotoUser < ApplicationRecord
  belongs_to :collected_photo, class_name: 'Photo', foreign_key: :photo_id
  belongs_to :collector, class_name: 'User', foreign_key: :collector_id

  def self.labels
    self.all.reject {|collect| collect.label == nil}.collect{|collect| collect.label}
  end


end
