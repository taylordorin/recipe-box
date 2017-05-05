class Api::V1::UsersController < ApplicationController

  def index
    recipes = Recipe.where(user_id: recipes.user_id)
    render json: recipes
  end
end
