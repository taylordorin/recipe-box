import React from 'react';
import { browserHistory, Link } from 'react-router';

const RecipeTile = (props) => {
  return(
    <div className="recipe-container">
      <div className="recipe-content">
         <h1 className="heading-1">
           {props.recipe_name}
         </h1>
         <ul className="recipe-list meta">
           <li className="recipe-item">
             <div className="recipe-value">{props.category}</div>
             <div className="recipe-text">Category</div>
           </li>
           <li className="recipe-item">
             <div className="recipe-value">{props.cook_time}</div>
             <div className="recipe-text">Mins</div>
           </li>
           <li className="recipe-item">
             <div className="recipe-value">{props.skill_level}</div>
             <div className="recipe-text">Skill Level</div>
           </li>
         </ul>
      </div>
    </div>
  )
}

export default RecipeTile;
