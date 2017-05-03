class Api::V1::RecipesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    recipes = Recipe.all


    render json: recipes
  end

  def show
    recipe = Recipe.find(params[:id])
    ingredients = Ingredient.where(recipe_id: recipe.id)
    instructions = Instruction.where(recipe_id: recipe.id)
    render json: {recipe: recipe, instructions: instructions, ingredients: ingredients}
    # render json: recipe
  end

  def create
    body = request.body.read
    parsed = JSON.parse(body)
    recipe = Recipe.new(parsed["recipe"])
    recipe.user = current_user
    if recipe.save
      ingredientArray = (parsed["ingredient"])
      ingredientArray.each do |ingredient|
        new_ingredient = Ingredient.new(ingredient)
        new_ingredient.recipe = recipe
        if new_ingredient.save
          instructionArray = (parsed["instruction"])
          instructionArray.each do |instruction|
            new_instruction = Instruction.new(instruction)
            new_instruction.recipe = recipe
            if new_instruction.save
              render json: { message: "it worked", id: recipe.id }
            else
              render json: { message: recipe.errors.full_messages }
            end
          end
          # render json: { message: "it worked" }
        else
          render json: { message: recipe.errors.full_messages }
        end
      end
      # render json: { message: "it worked" }
    else
      render json: { message: recipe.errors.full_messages }
    end
  end
end
