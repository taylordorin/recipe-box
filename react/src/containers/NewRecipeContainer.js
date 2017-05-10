import React, { Component } from 'react';
import RecipeFormTile from '../components/RecipeFormTile';
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
      listedCategories: ['Breakfast', 'Lunch', 'Appetizers', 'Soups', 'Salads', 'Beef',
                          'Chicken', 'Pork', 'Seafood', 'Vegetables', 'Desserts', 'Other'],
      cook_time: '',
      cookTimeCategories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
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
    this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
    this.handleDeleteInstruction = this.handleDeleteInstruction.bind(this);

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

  handleDeleteIngredient(index){
    let newIngredients = this.state.ingredients;
    newIngredients.splice(index, 1);
    this.setState({ ingredients: newIngredients });
  }
  handleDeleteInstruction(index){
    let newInstruction = this.state.instructions;
    newInstruction.splice(index, 1);
    this.setState({ instructions: newInstruction });
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
        <div key={index} className="form-complete">
        <button className="btn-delete" onClick={(index) => this.handleDeleteIngredient(index)}>X</button>
          {ingredient.quantity} {ingredient.unit} {ingredient.ingredient_name}
        </div>
    )
  })
	  let confirmedInstructions = this.state.instructions.map((instruction, index) => {
	    return(
	      <div key={index} className="form-complete">
        <button className="btn-delete" onClick={(index) => this.handleDeleteInstruction(index)}>X</button>
	        {instruction.step} {instruction.direction}
	      </div>
	    )
    })


      return (
      <div className="backgroundform">
        <div className="row">
          <form onSubmit={this.handleSubmit}  >
            <div className = "callout-box">
              <div className="show-heading-2"> ADD YOUR RECIPE </div>
              {errorDiv}
              <RecipeFormTile
                recipeContent = {this.state.recipe_name}
                recipeLabel = 'Recipe Name:'
                recipeName = 'recipe_name'
                recipeHandlerFunction = {this.handleNameChange}

                servingHandlerFunction = {this.handleTimeChange}
                servingLabel = 'Serves:'
                servingName = 'cook_time'
                servingsOptions = {this.state.cookTimeCategories}
                servingSelectedOption = {this.state.cook_time}

                categoryHandlerFunction = {this.handleCategoryChange}
                categoryLabel = 'Category:'
                categoryName = 'category'
                categoryOptions = {this.state.listedCategories}
                categorySelectedOption = {this.state.category}

                skillHandlerFunction = {this.handleSkillChange}
                skillLabel = 'Skill Level:'
                skillName = 'skill_level'
                skillOptions = {this.state.skillCategories}
                skillSelectedOption = {this.state.skill_level}
              />

              <div className="form-heading">Ingredients</div>
              {confirmedIngredients}
              <IngredientFormContainer
                clear = {this.handleClearForm}
                addIngredient = {this.addIngredient}
              />

              <div className="direction-heading">Directions</div>
              {confirmedInstructions}
              <DirectionFormContainer
                clear = {this.handleClearForm}
      					addInstruction = {this.addInstruction}
              />
            </div>

            <div className="buttonrow-form">
              <button type="submit" className="btn-show">Submit</button>
              <button><a className="btn-show" href='/recipes'> home</a></button>
            </div>

  	      </form>
        </div>

        <div className="footer"><img className="fork-knife-img" src={assetHelper["fork-knife.png"]}></img></div>
      </div >
    )
  }
}

export default NewRecipeContainer;
