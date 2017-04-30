class Api::V1::RecipesController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def index
    recipes_ids = Recipe.all.pluck(:id)
    render json: recipes_ids
  end

  def show
    recipe = Recipe.find(params[:id])
    render json: recipe
  end

  def create
    body = request.body.read
    parsed = JSON.parse(body)
    recipe = Recipe.new(parsed)
    recipe.user = current_user
    binding.pry
    if recipe.save
      render json: { message: "it worked" }
    else
      render json: { message: recipe.errors.full_messages }
    end    
  end
end
