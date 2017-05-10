import React, { Component } from 'react';
import { Link } from 'react-router';
import RecipeTile from '../components/RecipeTile'
import Boxes from '../components/Boxes';
import HeaderEntry from '../components/HeaderEntry';
import ScrollButton from '../components/ScrollButton';
import RandomRecipeTile from '../components/RandomRecipeTile';

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
    ? (<RandomRecipeTile
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
          <div className="main">
            <img className="logo-img" src={assetHelper["logo.png"]}></img>
          </div>

          <div className="buttonrow">
            <button><a className="btn-main" href='/recipes/new'> add your recipe</a></button>
            <button className="btn-main" onClick={this.handleRandomClick}>Random</button>
          </div>

          <div>
            {randomRecipesContainer}
          </div>
        </div>
        <div className="for-dinner">
          <div className='recipe-header'>
            What's for Dinner?
          </div >
          <div className='line-break'>
            <img className="linebrk-img" src={assetHelper["linebrk.png"]}></img>
          </div>
            <div><Boxes /></div>
          </div>
          <div className="measurement-container">
          <img className="fork-knife-img" src={assetHelper["fork-knife.png"]}></img>
            <div></div>
          </div>
          <div className="show-background">
            {recipesContainer}
            <ScrollButton
              scrollStepInPx="50"
              delayInMs="16.66"
            />
          </div>
          <div className="footer">
          <img className="fork-knife-img" src={assetHelper["fork-knife.png"]}></img>
          </div>
      </div>
    )
  }
}

export default HomeContainer;
