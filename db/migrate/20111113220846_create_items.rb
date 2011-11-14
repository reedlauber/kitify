class CreateItems < ActiveRecord::Migration
  def self.up
    create_table :items do |t|
      t.integer :kit_id
      t.string :name
      t.integer :quantity
      t.string :merchant_url
      t.decimal :price
      t.text :notes

      t.timestamps
    end
  end

  def self.down
    drop_table :items
  end
end
