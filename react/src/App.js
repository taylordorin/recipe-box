import React, { Component } from 'react';
import NewRecipeForm from './NewRecipeForm';
import Select from './Select';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ids: [],
      recipes: [],
      recipe_name: '',
      category: '',
      listedCategories: ['Breakfast', 'Lunch', 'Beverages', 'Appetizers', 'Soups', 'Salads',
      'Main dishes: Beef', 'Main dishes: Poultry', 'Main dishes: Pork', 'Main dishes: Seafood',
      'Main dishes: Vegetarian', 'Side dishes: Vegetables', 'Side dishes: Other', 'Desserts',
      'Canning / Freezing', 'Breads', 'Holidays', 'Entertaining'],
      
    }
    this.getRandomRecipe = this.getRandomRecipe.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    fetch('/api/v1/recipes')
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(ids => {
      this.setState({ids: ids})
    })
  }

  getRandomRecipe(){
    let recipeIds = this.state.ids
    let randomRecipeId = recipeIds[Math.floor(Math.random()*recipeIds.length)]
    fetch(`/api/v1/recipes/${randomRecipeId}`)
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(recipe => {
      let newState = [...this.state.recipe, recipe]
      this.setState({recipes: newState})
    })
  }

  handleNameChange(event){
    let newName = event.target.value
    this.setState({ recipe_name: newName })
  }

  handleCategoryChange(event){
    let newCategory = event.target.value
    this.setState({ category: newCategory })
  }

  handleSubmit(event){
    event.preventDefault()
    let requestBody = {recipe_name: this.state.recipe_name, category: this.state.category}
    fetch('/api/v1/recipes', {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(message => {
      console.log(message)
    })

  }

  render(){
    return(
      <div>
        <h1>Recipes</h1>
        <button className="button" onClick={this.getRandomRecipe}>Get Recipe</button>

        <NewRecipeForm
          handleNameChange={this.handleNameChange}
          handleSubmit={this.handleSubmit}
          name={this.state.recipe_name}
          />

          <Select
            handlerFunction={this.handleCategoryChange}
            label='Category:'
            name='category'
            options={this.state.listedCategories}
            selectedOption={this.state.category}
          />
          <input className="button" type='submit' />
      </div>
    )
  }
}

export default App;
