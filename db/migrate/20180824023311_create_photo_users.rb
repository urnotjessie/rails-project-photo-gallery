class CreatePhotoUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :photo_users do |t|
      t.integer :photo_id
      t.integer :collector_id
      t.string :label
      
      t.timestamps
    end
  end
end
