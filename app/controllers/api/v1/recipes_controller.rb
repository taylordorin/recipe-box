class Api::V1::RecipesController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def index
    recipes_ids = Recipe.all.pluck(:id)
    # recipes = []
    # Recipe.all.each do |r|
    #   recipe = {}
    #   recipe['ingrediants'] = r.ingrediants
    #   recipe['name'] = r.name
    #   recipes << recipe
    # end

    render json: recipes_ids
  end

  def show
    recipe = Recipe.find(params[:id])
    render json: recipe
  end

  def create
    body = request.body.read
    parsed = JSON.parse(body)
    # binding.pry
    recipe = Recipe.new(parsed["recipe"])
    binding.pry
    ingredient = Ingredient.new(parsed["ingredient"])
    binding.pry
    recipe.user = current_user
    ingredient.recipe = recipe

    if recipe.save && ingredient.save
        binding.pry
        render json: { message: "it worked" }
    else
      render json: { message: recipe.errors.full_messages }
    end
  end
end
