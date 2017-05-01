import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import HomeContainer from './containers/HomeContainer'
import NewRecipeContainer from './containers/NewRecipeContainer';

const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={HomeContainer} />
      <Route path='/recipes/new' component={NewRecipeContainer} />
    </Router>
  );
}

export default App;
