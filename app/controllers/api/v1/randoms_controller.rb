class Api::V1::RandomsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    recipes = Recipe.where(user: current_user)
    random_recipe = recipes.sample
    render json: random_recipe
  end

end
