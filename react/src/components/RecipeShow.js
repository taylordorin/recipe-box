import React from 'react';
import { browserHistory, Link } from 'react-router';

const RecipeShow = (props) => {
  const divStyle = {
      borderRight: '1pt solid grey',
      width: '120px'
    };
  const divStyle2 = {
      borderRight: '1px solid grey',
    };
  return(
    <div className="show-recipe-container">
      <div className="show-recipe-show">

         <ul className="show-recipe-list meta">
           <li className="show-recipe-item" style={divStyle}>
             <div className="show-recipe-value">{props.category}</div>
             <div className="show-recipe-text">Category</div>
           </li>
           <li className="show-recipe-item" style={divStyle2}>
             <div className="show-recipe-value">{props.cook_time}</div>
             <div className="show-recipe-text">Servings</div>
           </li>
           <li className="show-recipe-item">
             <div className="show-recipe-value">{props.skill_level}</div>
             <div className="show-recipe-text">Skill Level</div>
           </li>
         </ul>
      </div>
    </div>
  )
}

export default RecipeShow;


// This page shows the recipe
