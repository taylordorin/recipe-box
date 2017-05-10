import React from 'react';

const IngredientTile = (props) => {
  return(
      <div className="ingredient-container">
        <div className="ingredient-show">
           <span className="ingredient-text">{props.quantity} {props.unit}</span><span className="ingredient">  {props.ingredient_name} </span>
        </div>
      </div>
  )
}

export default IngredientTile;
