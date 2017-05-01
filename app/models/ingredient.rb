class Ingredient < ApplicationRecord
  validates :ingredient_name, presence: true
  validates :unit, presence: true
  validates :quantity, presence: true

  belongs_to :recipe
end
