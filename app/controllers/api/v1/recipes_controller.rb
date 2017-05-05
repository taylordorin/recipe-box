class Api::V1::RecipesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index

    recipes = Recipe.where(user: current_user)
    render json: recipes
  end

  def show
    recipe = Recipe.find(params[:id])
    ingredients = Ingredient.where(recipe_id: recipe.id)
    instructions = Instruction.where(recipe_id: recipe.id)
    sorted_instructions = instructions.sort_by do |instruction|
      instruction[:step]
    end
    render json: {recipe: recipe, instructions: sorted_instructions, ingredients: ingredients}
    # render json: recipe
  end

  def destroy
    recipe = Recipe.find(params[:id])
    recipe.destroy
  end

  def create
    body = request.body.read
    parsed = JSON.parse(body)
    recipe = Recipe.new(parsed["recipe"])

    recipe.user = current_user
    recipe_saved = recipe.save
    if !recipe_saved
      render json: { message: recipe.errors.full_messages }
      return
    end
    ingredientArray = (parsed["ingredient"])
    ingredientArray.each do |ingredient|
      new_ingredient = Ingredient.new(ingredient)
      new_ingredient.recipe = recipe
      ingredient_saved = new_ingredient.save
      if !ingredient_saved
         render json: { message: recipe.errors.full_messages }
         return
      end
    end
    instructionArray = (parsed["instruction"])
    instructionArray.each do |instruction|
      new_instruction = Instruction.new(instruction)
      new_instruction.recipe = recipe
      instruction_saved = new_instruction.save
      if !instruction_saved
        render json: { message: recipe.errors.full_messages }
        return
      end
     end
     render json: { message: "it worked", id: recipe.id }
   end

end
