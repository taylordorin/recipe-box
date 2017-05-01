class Instruction < ApplicationRecord
  validates :step, presence: true
  validates :direction, presence: true

  belongs_to :recipe
end
