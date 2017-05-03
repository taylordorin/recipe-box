import React, { Component } from 'react';
import { Link } from 'react-router';
import RecipeTile from '../components/RecipeTile'
import LandingPage from '../components/LandingPage';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
      this.state={
      recipes: []
    };
  }

  componentDidMount() {
    fetch('/api/v1/recipes')
    .then(response => {
      let parsed = response.json();
      return parsed;
    }).then(recipes => {
      this.setState({ recipes: recipes });
    });
  }

  render() {
    let recipesContainer = this.state.recipes.map(recipe => {
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

    return(
      <div>
        <LandingPage />
        {recipesContainer}
      </div>
    )
  }
}

export default HomeContainer;
