class Api::V1::RecipesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    category_array = ['Breakfast', 'Lunch', 'Appetizers', 'Soups', 'Salads', 'Beef',
                        'Chicken', 'Pork', 'Seafood', 'Vegetables', 'Desserts', 'Other']
    output = {}
    category_array.each do |category|
      recipes = Recipe.where(user: current_user, category: category)
      sorted_recipes = recipes.sort_by do |recipe|
        recipe[:recipe_name]
      end
      puts(sorted_recipes)
      output[category] = sorted_recipes
    end
    render json: output
  end

  def show
    recipe = Recipe.find(params[:id])
    if (current_user.nil?) || (recipe.nil?) || (recipe.user.nil?) || (recipe.user.id.nil?)
      render json: { message: "Prerequisites not met"}
      return
    end
    if recipe.user.id != current_user.id
      render json: { message: "User does not match recipe." }
      return
    end
    ingredients = Ingredient.where(recipe_id: recipe.id)
    instructions = Instruction.where(recipe_id: recipe.id)
    sorted_instructions = instructions.sort_by do |instruction|
      instruction[:step]
    end
    render json: {recipe: recipe, instructions: sorted_instructions, ingredients: ingredients}
    # render json: recipe
  end

  def destroy
    puts "starting destroy"
    recipe = Recipe.find(params[:id])
    ingredients = Ingredient.where(recipe_id: recipe.id)
    ingredients.each do |ingredient|
      ingredient.destroy
    end
    instructions = Instruction.where(recipe_id: recipe.id)
    instructions.each do |instruction|
      instruction.destroy
    end
    puts recipe
    recipe.destroy
    puts "ending destroy"
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
    if ingredientArray.empty?
      render json: { message: "Please enter an ingredient." }
      return
    else
      ingredientArray.each do |ingredient|
        new_ingredient = Ingredient.new(ingredient)
        new_ingredient.recipe = recipe
        ingredient_saved = new_ingredient.save
        if !ingredient_saved
           render json: { message: recipe.errors.full_messages }
           return
        end
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
