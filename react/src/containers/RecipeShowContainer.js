import React, { Component } from 'react';
import RecipeShow from '../components/RecipeShow';
import IngredientTile from '../components/IngredientTile';
import InstructionTile from '../components/InstructionTile';
import { browserHistory, Link } from 'react-router';
import BackButton from '../components/BackButton';

class RecipeShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      selectedInstructionId: null
    };
    this.handleDataClick = this.handleDataClick.bind(this);
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

  handleDataClick(id) {
    if (this.state.selectedInstructionId === id){
      this.setState({selectedInstructionId: null});
    } else {
      this.setState({selectedInstructionId: id});
    }
  }

  render() {
    if (!this.state.recipe.recipe){
      return false;
    }
    console.log(this.state.recipe);
    let ingredientsContainer = this.state.recipe.ingredients.map(ingredient => {
      return(
        <IngredientTile
          key={ingredient.id}
          id={ingredient.id}
          quantity={ingredient.quantity}
          unit={ingredient.unit}
          ingredient_name={ingredient.ingredient_name}
        />
      )
    })

    let instructionsContainer = this.state.recipe.instructions.map(instruction => {
      let onDataClick = () => {
        this.handleDataClick(instruction.id);
      };

      let isHidden;
      if (this.state.selectedInstructionId === instruction.id) {
        isHidden=false;
      } else {
        isHidden=true;
      }

      return(
        <InstructionTile
          key={instruction.id}
          id={instruction.id}
          step={instruction.step}
          direction={instruction.direction}
          handleClick={onDataClick}
          hidden={isHidden}
        />
      )
    })
    return(
      <div>
      <div className="showtopper"></div>
      <RecipeShow
        id={this.state.recipe.recipe.id}
        recipe_name={this.state.recipe.recipe.recipe_name}
        category={this.state.recipe.recipe.category}
        cook_time={this.state.recipe.recipe.cook_time}
        skill_level={this.state.recipe.recipe.skill_level}
       />
      <div className="row">
         <div className="large-5 columns">
          <div className="recipe-item">
            <div className="recipe-value">Ingredients</div>
          </div>
           {ingredientsContainer}
        </div>

        <div className="large-7 columns">
          <div className="recipe-item">
            <div className="recipe-value">Directions</div>
          </div>
            {instructionsContainer}
        </div>
      </div>

      <BackButton />
     </div>
    )
  }
}

export default RecipeShowContainer;

//
// <div>
//   <div className="backgroundimage">
//     <div className="container">
//       <div className="main">
//         <h1>The Dirty Apron</h1>
//         <h2 className="btn-main"><Link to='/recipes/new'> add your recipe</Link></h2>
//       </div>
//     </div>
//   </div>
// </div>

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
