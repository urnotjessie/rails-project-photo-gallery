class ChangeCreatorIdInPhotos < ActiveRecord::Migration[5.2]
  def change
    rename_column :photos, :creator_id, :user_id
  end
end
