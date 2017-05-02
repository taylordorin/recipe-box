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
    recipe = Recipe.new(parsed["recipe"])
    recipe.user = current_user
    if recipe.save
      # render json: { message: "it worked" }
    else
      render json: { message: recipe.errors.full_messages }
    end

    ingredientArray = (parsed["ingredient"])
    ingredientArray.each do |ingredient|
      new_ingredient = Ingredient.new(ingredient)
      new_ingredient.recipe = recipe
      if new_ingredient.save
        # render json: { message: "it worked" }
      else
        render json: { message: recipe.errors.full_messages }
      end
    end

    instructionArray = (parsed["instruction"])
    instructionArray.each do |instruction|
      new_instruction = Instruction.new(instruction)
      new_instruction.recipe = recipe
      if new_instruction.save
        # render json: { message: "it worked" }
      else
        render json: { message: recipe.errors.full_messages }
      end
    end

  end
end
