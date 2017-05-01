class CreateIngredients < ActiveRecord::Migration[5.0]
  def change
    create_table :ingredients do |t|
      t.string :ingredient_name, null: false
      t.string :unit, null: false
      t.string :quantity, null: false

      t.belongs_to :recipe
      t.timestamps
    end
  end
end
