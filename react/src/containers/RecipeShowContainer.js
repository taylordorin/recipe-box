import React, { Component } from 'react';
import RecipeShow from '../components/RecipeShow';
import IngredientTile from '../components/IngredientTile';
import InstructionTile from '../components/InstructionTile';
import { browserHistory, Link } from 'react-router';
import BackButton from '../components/BackButton';
import MeasurementTile from '../components/MeasurementTile';

class RecipeShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      selectedInstructionId: null,
      showMeasurement: false
    };
    this.handleDataClick = this.handleDataClick.bind(this);
    this.handleMeasurementClick = this.handleMeasurementClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getConfirmation = this.getConfirmation.bind(this);
  }

  componentDidMount() {
    let recipeId = this.props.params.id;
    fetch(`/api/v1/recipes/${recipeId}`)
    .then(response => {
      let parsed = response.json();
      return parsed;
    }).then(parsed => {
      this.setState({ recipe: parsed});
    });
  }

  handleDelete() {
    let recipeId = this.props.params.id;
    console.log("starting delete");
    fetch(`/api/v1/recipes/${recipeId}`, {
      credentials: "include",
      method: "DELETE"
    });
    console.log("finish delete");
  }

  getConfirmation() {
    let returnValue = confirm("Do you want to delete?");
    if (returnValue === true) {
      handleDelete();
      return true;
    } else {
      return false;
    }
  }


  handleDataClick(id) {
    if (this.state.selectedInstructionId === id){
      this.setState({selectedInstructionId: null});
    } else {
      this.setState({selectedInstructionId: id});
    }
  }

  handleMeasurementClick(event) {
    event.preventDefault();
    this.setState({ showMeasurement: !this.state.showMeasurement })
  }

  render() {
    if (!this.state.recipe.recipe){
      return false;
    }
    console.log(this.state.recipe);
    let ingredientsContainer = this.state.recipe.ingredients.map(ingredient => {
      return(
        <IngredientTile
          key={ingredient.id}
          id={ingredient.id}
          quantity={ingredient.quantity}
          unit={ingredient.unit}
          ingredient_name={ingredient.ingredient_name}
        />
      )
    })

    let showtopper;
      if (this.state.recipe.recipe.category == "Breakfast") {
        showtopper = "showtopper image1"
      } else if (this.state.recipe.recipe.category == "Lunch") {
        showtopper = "showtopper image2"
      } else if (this.state.recipe.recipe.category == "Appetizers") {
        showtopper = "showtopper image3"
      } else if (this.state.recipe.recipe.category == "Soups") {
        showtopper = "showtopper image4"
      } else if (this.state.recipe.recipe.category == "Salads") {
        showtopper = "showtopper image5"
      } else if (this.state.recipe.recipe.category == "Beef") {
        showtopper = "showtopper image6"
      } else if (this.state.recipe.recipe.category == "Chicken") {
        showtopper = "showtopper image7"
      } else if (this.state.recipe.recipe.category == "Pork") {
        showtopper = "showtopper image8"
      } else if (this.state.recipe.recipe.category == "Seafood") {
        showtopper = "showtopper image9"
      } else if (this.state.recipe.recipe.category == "Vegetables") {
        showtopper = "showtopper image10"
      } else if (this.state.recipe.recipe.category == "Desserts") {
        showtopper = "showtopper image11"
      } else {
        showtopper = "showtopper image12"
      }

    let instructionsContainer = this.state.recipe.instructions.map(instruction => {
      let onDataClick = () => {
        this.handleDataClick(instruction.id);
      };

      let isHidden;
      if (this.state.selectedInstructionId === instruction.id) {
        isHidden=false;
      } else {
        isHidden=true;
      }

      return(
        <InstructionTile
          key={instruction.id}
          id={instruction.id}
          step={instruction.step}
          direction={instruction.direction}
          handleClick={onDataClick}
          hidden={isHidden}
        />
      )
    })

    return(
      <div>
        <div className={showtopper}>
          <div className="show-heading-1">
            {this.state.recipe.recipe.recipe_name}
          </div>
        </div>

        <div className="measurement-container-drop">
        <div className='measurement-header' onClick={this.handleMeasurementClick}>measurement conversion chart</div>
        {this.state.showMeasurement && < MeasurementTile / >}
        </div>

        <div className="show-background">

          <div className="row">
            <div className="large-4 columns">

                <div className="ingredient-item">
                  <div className="ingredient-value">Ingredients</div>
                </div>
              {ingredientsContainer}
          </div>


            <div className="large-8 columns">
                <div className="direction-item">
                  <div className="direction-value">Directions</div>
                </div>
                {instructionsContainer}
            </div>
          </div>



          <div className="buttonrow-show">
            <button><a className="btn-show" href='/recipes/new'> add a recipe</a></button>
            <button><a className="btn-show" href='/recipes'> home</a></button>
            <button><a onClick={this.getConfirmation} className="btn-show" href='/recipes'> delete </a></button>
          </div>



        </div>
        <div className="footer-main">
        <RecipeShow
        id={this.state.recipe.recipe.id}
        recipe_name={this.state.recipe.recipe.recipe_name}
        category={this.state.recipe.recipe.category}
        cook_time={this.state.recipe.recipe.cook_time}
        skill_level={this.state.recipe.recipe.skill_level}
        />
        </div>
      </div>
    )
  }
}

export default RecipeShowContainer;
