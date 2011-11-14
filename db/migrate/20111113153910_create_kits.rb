class CreateKits < ActiveRecord::Migration
  def self.up
    create_table :kits do |t|
      t.string :title
      t.string :token
      t.string :slug

      t.timestamps
    end
  end

  def self.down
    drop_table :kits
  end
end
