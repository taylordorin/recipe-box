class CreateRecipes < ActiveRecord::Migration[5.0]
  def change
    create_table :recipes do |t|
      t.string :recipe_name, null: false
      t.string :category, null: false
      t.integer :cook_time
      t.string :skill_level

      t.belongs_to :user
      t.timestamps
    end
  end
end
