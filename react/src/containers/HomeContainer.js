import React, { Component } from 'react';
import { Link } from 'react-router';
import RecipeTile from '../components/RecipeTile'
import LandingPage from '../components/LandingPage';
import Boxes from '../components/Boxes';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
      this.state={
      recipes: []
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
        this.setState({ recipes: [body] });
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
        <div className="row"><Boxes /></div>
        <button className="random-button" onClick={this.handleRandomClick}>Random</button>
        {recipesContainer}
      </div>
    )
  }
}

export default HomeContainer;
