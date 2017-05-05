import React, { Component } from 'react';
import NewRecipeForm from '../components/NewRecipeForm';
import Select from '../components/Select';
import IngredientFormContainer from './IngredientFormContainer';
import DirectionFormContainer from './DirectionFormContainer';
import { browserHistory } from 'react-router';

class NewRecipeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      id: '',
      recipes: [],
      recipe_name: '',
      category: '',
      listedCategories: ['Breakfast', 'Lunch', 'Beverages', 'Appetizers', 'Soups', 'Salads',
      'Beef', 'Poultry', 'Pork', 'Seafood',
      'Vegetarian', 'Vegetables', 'Other', 'Desserts',
      'Breads', 'Holidays', 'Entertaining'],
      cook_time: '',
      skill_level: '',
      skillCategories: ['Beginner', 'Intermediate', 'Advanced'],
      ingredients: [],
      instructions: [],
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
	  this.handleClearForm = this.handleClearForm.bind(this);
	  this.handleFetch = this.handleFetch.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
		this.addInstruction = this.addInstruction.bind(this);
		this.handleGoBack = this.handleGoBack.bind(this);

    this.validateNameChange = this.validateNameChange.bind(this);
    this.validateCategoryChange = this.validateCategoryChange.bind(this);
  }

  handleNameChange(event) {
    this.validateNameChange(event.target.value)
    let newName = event.target.value;
    this.setState({
      recipe_name: newName
    });
  }

  handleCategoryChange(event) {
    this.validateCategoryChange(event.target.value);
    let newCategory = event.target.value;
    this.setState({
      category: newCategory
    });
  }

  handleSkillChange(event) {
    console.log("handle skill change called");
    let newSkill = event.target.value;
    this.setState({
      skill_level: newSkill
    });
  }

  handleTimeChange(event) {
    let newTime = event.target.value;
    this.setState({
        cook_time: newTime
    });
  }

	addIngredient(ingredientObject) {
		let newIngredient = ingredientObject;
		this.setState({
			ingredients: [...this.state.ingredients, newIngredient]
		});
  }

	addInstruction(instructionObject) {
		let newInstruction = instructionObject;
		this.setState({
			instructions: [...this.state.instructions, newInstruction]
		});
  }

  validateNameChange(recipeNameField) {
    if (recipeNameField === '' || recipeNameField === ' ') {
      let newError = {recipe_name: 'Recipe name field may not be blank.' };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    }else{
      let errorState = this.state.errors;
      delete errorState.recipe_name;
      this.setState({ errors: errorState });
      return true;
    }
  }

  validateCategoryChange(recipeCategoryField) {
    if (recipeCategoryField === '' || recipeCategoryField === ' ') {
      let newError = {category: 'Category field may not be blank.' };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    }else{
      let errorState = this.state.errors;
      delete errorState.category;
      this.setState({ errors: errorState });
      return true;
    }
  }

  handleClearForm(event) {
  event.preventDefault();
	  this.setState({
		  recipe_name: '',
		  category: '',
		  cook_time: '',
		  skill_level: '',
		  unit: '',
		  quantity: '',
		  ingredient_name: '',
		  step: '',
		  direction: ''
	  });
	}

	handleGoBack(id) {
		browserHistory.push(`/recipes/${id}`);
	}

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.validateNameChange(this.state.recipe_name) &&
      this.validateCategoryChange(this.state.category)
    ) {
      let requestBody = {
        recipe: {
          recipe_name: this.state.recipe_name,
          category: this.state.category,
          cook_time: this.state.cook_time,
          skill_level: this.state.skill_level
        },
        ingredient: this.state.ingredients,
        instruction: this.state.instructions
      };
      this.handleFetch(requestBody);
    }
  }

  handleFetch(requestBody){
  fetch('/api/v1/recipes', {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(requestBody)
    })
    .then(response => {
      let parsed = response.json();
      return parsed;
    }).then(message => {
      return message.id;
    })
    .then(id => {
      this.handleGoBack(id);
    });
  }

  render() {
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }

    let confirmedIngredients = this.state.ingredients.map((ingredient, index) => {
      return(
        <div key={index}>
          {ingredient.quantity} {ingredient.unit} {ingredient.ingredient_name}
        </div>
    )
  })
	  let confirmedInstructions = this.state.instructions.map((instruction, index) => {
	    return(
	      <div key={index}>
	        {instruction.step} {instruction.direction}
	      </div>
	    )
    })
      return (
      <div className="row">
        <form onSubmit={this.handleSubmit} className = "callout-box" >
        <h1> Recipes </h1>
        {errorDiv}
	      <NewRecipeForm
	        content = {this.state.recipe_name}
	        label = 'Recipe Name:'
	        name = 'recipe_name'
	        handlerFunction = {this.handleNameChange}
	      />

      	<NewRecipeForm
          content = {this.state.cook_time}
          label = 'Cook Time in minutes:'
          name = 'cook_time'
          handlerFunction = {this.handleTimeChange}
        />

        <Select
          handlerFunction = {this.handleCategoryChange}
          label = 'Category:'
          name = 'category'
          options = {this.state.listedCategories}
          selectedOption = {this.state.category}
        />

        <Select
          handlerFunction = {this.handleSkillChange}
          label = 'Skill Level:'
          name = 'skill_level'
          options = {this.state.skillCategories}
          selectedOption = {this.state.skill_level}
        />

        <h3>Ingredients</h3>
        {confirmedIngredients}
        <IngredientFormContainer
          clear = {this.handleClearForm}
          addIngredient = {this.addIngredient}
        />

        <h3>Directions</h3>
        {confirmedInstructions}
        <DirectionFormContainer
          clear = {this.handleClearForm}
					addInstruction = {this.addInstruction}
        />
        <input type="submit" className="button" value="Submit "/>
	      </form>
      </div >
    )
  }
}

export default NewRecipeContainer;
