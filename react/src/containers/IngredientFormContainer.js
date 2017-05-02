import React from 'react';
import NewRecipeForm from '../components/NewRecipeForm';
import Select from '../components/Select';

class IngredientFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: '',
      unitCategories: ["each", "teaspoon", "tablespoon", "cup", "fluid Ounce", "pint", "quart"],
      quantity: '',
			ingredient_name: ''
    };
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.sendIngredientToForm = this.sendIngredientToForm.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  handleClearForm(event) {
  event.preventDefault();
  this.setState({
    quantity: '',
    unit: '',
    ingredient_name: ''
  });
}

  sendIngredientToForm() {
    let ingredient = {
      quantity: this.state.quantity,
      unit: this.state.unit,
      ingredient_name: this.state.ingredient_name
    };
    console.log(ingredient);
    this.props.addIngredient(ingredient);
    this.handleClearForm(event);
  }

  handleUnitChange(event) {
    let newUnit = event.target.value;
    this.setState({
      unit: newUnit
    });
  }

  handleQuantityChange(event) {
    let newQuantity = event.target.value;
    this.setState({
      quantity: newQuantity
    });
  }

  handleIngredientChange(event) {
    let newIngredient = event.target.value;
    this.setState({
      ingredient_name: newIngredient
    });
  }
//this.props.clear
  render() {
    return (
      <div>
        <NewRecipeForm
          content = {this.state.quantity}
          label = 'Quantity:'
          name = 'quantity'
          handlerFunction = {this.handleQuantityChange}
        />

        <Select
          handlerFunction = {this.handleUnitChange}
          label = 'Unit:'
          name = 'unit'
          options = {this.state.unitCategories}
          selectedOption = {this.state.unit}
        />

        <NewRecipeForm
          content = {this.state.ingredient_name}
          label = 'Ingredient:'
          name = 'ingredient_name'
          handlerFunction = {this.handleIngredientChange}
        />
        <input type="button" className="button" value="Add Ingredient" onClick={this.sendIngredientToForm}/>
      </div>
    )
  }
}

export default IngredientFormContainer
