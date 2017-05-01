class Recipe < ApplicationRecord
  validates :recipe_name, presence: true
  validates :category, presence: true

  belongs_to :user
  has_many :ingredients
  has_many :instructions
end
