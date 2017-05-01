import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import NewRecipeContainer from './containers/NewRecipeContainer';

$(function() {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});
