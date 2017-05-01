class CreateInstructions < ActiveRecord::Migration[5.0]
  def change
    create_table :instructions do |t|
      t.integer :step, null: false
      t.text :direction, null: false

      t.belongs_to :recipe
      t.timestamps
    end
  end
end
