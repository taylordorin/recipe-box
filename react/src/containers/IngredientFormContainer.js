import React from 'react';
import NewRecipeForm from '../components/NewRecipeForm';
import Select from '../components/Select';

class IngredientFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      unit: '',
      unitCategories: ["each", "teaspoon", "tablespoon", "cup", "Ounce", "fluid Ounce", "pint", "quart"],
      quantity: '',
			ingredient_name: ''
    };
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.sendIngredientToForm = this.sendIngredientToForm.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);

    this.validateQuantityChange = this.validateQuantityChange.bind(this);
    this.validateUnitChange = this.validateUnitChange.bind(this);
    this.validateIngredientChange = this.validateIngredientChange.bind(this);
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
    if (
      this.validateIngredientChange(this.state.ingredient_name) &&
      this.validateQuantityChange(this.state.quantity) &&
      this.validateUnitChange(this.state.unit)
    ) {
      let ingredient = {
        ingredient_name: this.state.ingredient_name,
        quantity: this.state.quantity,
        unit: this.state.unit
      };
      this.props.addIngredient(ingredient);
      this.handleClearForm(event);
    }
  }

  handleUnitChange(event) {
    this.validateUnitChange(event.target.value);
    let newUnit = event.target.value;
    this.setState({
      unit: newUnit
    });
  }
  handleQuantityChange(event) {
    this.validateQuantityChange(event.target.value);
    let newQuantity = event.target.value;
    this.setState({
      quantity: newQuantity
    });
  }
  handleIngredientChange(event) {
    this.validateIngredientChange(event.target.value);
    let newIngredient = event.target.value;
    this.setState({
      ingredient_name: newIngredient
    });
  }

  validateQuantityChange(quantityField) {
    if (quantityField === '' || quantityField === ' ') {
      let newError = {quantity: 'Quantity may not be blank.' };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    }else{
      let errorState = this.state.errors;
      delete errorState.quantity;
      this.setState({ errors: errorState });
      return true;
    }
  }
  validateUnitChange(unitField) {
    if (unitField === '' || unitField === ' ') {
      let newError = {unit: 'Unit may not be blank.' };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    }else{
      let errorState = this.state.errors;
      delete errorState.unit;
      this.setState({ errors: errorState });
      return true;
    }
  }
  validateIngredientChange(ingredientNameField) {
    if (ingredientNameField === '' || ingredientNameField === ' ') {
      let newError = {ingredient_name: 'Ingredient field may not be blank.' };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    }else{
      let errorState = this.state.errors;
      delete errorState.ingredient_name;
      this.setState({ errors: errorState });
      return true;
    }
  }
//this.props.clear
  render() {
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }
    return (
      <div>
      {errorDiv}
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
