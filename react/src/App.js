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
      cook_time: '',
      skill_level: '',
      skillCategories: ['Beginner', 'Intermediate', 'Advanced']
    }
    this.getRandomRecipe = this.getRandomRecipe.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSkillChange = this.handleSkillChange.bind(this)
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

  handleSkillChange(event){
    console.log("handle skill change called")
    let newSkill = event.target.value
    this.setState({ skill_level: newSkill })
  }

  handleSubmit(event){
    event.preventDefault()
    let requestBody = {recipe_name: this.state.recipe_name, category: this.state.category, skill_level: this.state.skill_level}
    console.log("creating recipe" + requestBody)
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
        <form onSubmit={this.handleSubmit} className="callout">
          <h1>Recipes</h1>
          <NewRecipeForm
            content={this.state.recipe_name}
            label='Recipe Name:'
            name='recipe_name'
            handlerFunction={this.handleNameChange}
            />

            <Select
              handlerFunction={this.handleCategoryChange}
              label='Category:'
              name='category'
              options={this.state.listedCategories}
              selectedOption={this.state.category}
            />

            <Select
              handlerFunction={this.handleSkillChange}
              label='Skill Level:'
              name='skill_level'
              options={this.state.skillCategories}
              selectedOption={this.state.skill_level}
            />

            <input className="button" type='submit' />
        </form>
      </div>
    )
  }
}

export default App;

// <button className="button" onClick={this.getRandomRecipe}>Get Random Recipe</button>
