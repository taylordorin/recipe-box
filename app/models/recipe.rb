class Recipe < ApplicationRecord
  validates :recipe_name, presence: true
  validates :category, presence: true

  belongs_to :user
  has_many :ingredients, dependent: :destroy
  has_many :instructions, dependent: :destroy

end



# def as_json(options={})
#   super(:only =>[:recipe_name],
#     :include => {
#       :ingredients,
#       :instructions
#     }
#   )
# end
