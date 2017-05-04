import React, { Component } from 'react';
import RecipeShow from '../components/RecipeShow';

class RecipeShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {}
    };
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

  render() {
    if (!this.state.recipe.recipe){
      return false;
    }
    // let ingredientsContainer = this.state.recipe.ingredients.map(ingredient => {
    //   return(
    //     <IngredientTile
    //       key={ingredient.id}
    //       id={ingredient.id}
    //       recipe_name={recipe.recipe_name}
    //       category={recipe.category}
    //       cook_time={recipe.cook_time}
    //       skill_level={recipe.skill_level}
    //     />
    //   )
    // })
    return(
      <div>
      <RecipeShow
        id={this.state.recipe.recipe.id}
        recipe_name={this.state.recipe.recipe.recipe_name}
        category={this.state.recipe.recipe.category}
        cook_time={this.state.recipe.recipe.cook_time}
        skill_level={this.state.recipe.recipe.skill_level}
       />
       {ingredientsContainer}
     </div>
    )
  }
}

export default RecipeShowContainer;

//

// import React from 'react';
// import { Route, IndexRoute, Router, browserHistory } from 'react-router';
// import ArticlesIndexContainer from './containers/ArticlesIndexContainer';
// import ArticleShowContainer from './containers/ArticleShowContainer';
//
// const App = (props) => {
//   return (
//     <Router history={browserHistory}>
//       <Route path='/' component={ArticlesIndexContainer} />
//       <Route path='/articles' component={ArticlesIndexContainer} />
//       <Route path='/articles/:id' component={ArticleShowContainer} />
//     </Router>
//   );
// }
//
// export default App;
