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
      this.setState({ recipe: parsed.recipe });
    });
  }

  render() {
    return(
      <RecipeShow
        id={this.state.recipe.id}
        recipe_name={this.state.recipe.recipe_name}
        category={this.state.recipe.category}
        cook_time={this.state.recipe.cook_time}
        skill_level={this.state.recipe.skill_level}
       />
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
