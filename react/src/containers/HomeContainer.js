import React, { Component } from 'react';
import { Link } from 'react-router';
import RecipeTile from '../components/RecipeTile'
import Boxes from '../components/Boxes';
import HeaderEntry from '../components/HeaderEntry';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
      this.state={
      recipes: [],
      randomRecipe: ""
    };
    this.handleRandomClick = this.handleRandomClick.bind(this);
    this.randomFetch = this.randomFetch.bind(this);
    }

    handleRandomClick(event){
      event.preventDefault()
      this.randomFetch()
    }

    randomFetch() {
      fetch('/api/v1/randoms/', {
        credentials: "include",
        method: "GET"
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ randomRecipe: body });
      })
    }

  componentDidMount() {
    fetch('/api/v1/recipes', {
      credentials: "include",
      method: "GET"
    })
    .then(response => {
      let parsed = response.json();
      return parsed;
    }).then(recipes => {
      this.setState({ recipes: recipes });
    });
  }

  render() {
    console.log(this.state.randomRecipe);

    let randomRecipesContainer = (this.state.randomRecipe)
    ? (<RecipeTile
          key={this.state.randomRecipe.id}
          id={this.state.randomRecipe.id}
          recipe_name={this.state.randomRecipe.recipe_name}
          category={this.state.randomRecipe.category}
          cook_time={this.state.randomRecipe.cook_time}
          skill_level={this.state.randomRecipe.skill_level}
        />)
    : "";

    let recipesContainer = [];
    for (let key in this.state.recipes) {
      let categoryList = this.state.recipes[key];
      // console.log("printing category list");
      // console.log(categoryList);
      let tiles = categoryList.map(recipe => {
        return(
          <RecipeTile
            key={recipe.id}
            id={recipe.id}
            recipe_name={recipe.recipe_name}
            category={recipe.category}
            cook_time={recipe.cook_time}
            skill_level={recipe.skill_level}
          />
        )
      })
      if (tiles.length !== 0) {
      recipesContainer = recipesContainer.concat(
        <HeaderEntry
          key = {key}
          category = {key}
        />
      )
      recipesContainer = recipesContainer.concat(tiles)
      }
    }
    // console.log("printing recipesContainer")
    // console.log(recipesContainer)
    return(
      <div>
      <div className="backgroundimage">
        <div className="container">
          <div className="main">
            <h1>The Dirty Apron</h1>
            <h2 className="btn-main"><Link to='/recipes/new'> add your recipe</Link></h2>
            <button className="btn-main" onClick={this.handleRandomClick}>Random</button>
            {randomRecipesContainer}
          </div>
        </div>
      </div>
        <div><Boxes /></div>
        {recipesContainer}
      </div>
    )
  }
}

export default HomeContainer;
