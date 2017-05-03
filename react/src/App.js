import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import HomeContainer from './containers/HomeContainer';
import NewRecipeContainer from './containers/NewRecipeContainer';
import RecipeShowContainer from './containers/RecipeShowContainer';

const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={HomeContainer} />
      <Route path='/recipes' component={HomeContainer} />
      <Route path='/recipes/new' component={NewRecipeContainer} />
      <Route path='/recipes/:id' component={RecipeShowContainer} />
    </Router>
  );
}

export default App;
