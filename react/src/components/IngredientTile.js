import React from 'react';

const IngredientTile = (props) => {
  return(
    <div className="row">
        <div className="recipe-container">
          <div className="ingredient-show">
             <div className="recipe-text">{props.quantity} {props.unit} {props.ingredient_name} </div>
          </div>
        </div>
    </div>
  )
}

export default IngredientTile;
