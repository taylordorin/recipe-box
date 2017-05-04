import React from 'react';
import { browserHistory, Link } from 'react-router';

const RecipeShow = (props) => {
  const divStyle = {
      borderRight: '1pt solid grey',
      width: '129px'
    };
  const divStyle2 = {
      borderRight: '1pt solid grey',
    };
  return(
    <div className="row">
      <div className="large-4 columns">
        <div className="recipe-container">
          <div className="recipe-show">
             <h1 className="heading-1">
               {props.recipe_name}
             </h1>
             <ul className="recipe-list meta">
               <li className="recipe-item" style={divStyle}>
                 <div className="recipe-value">{props.category}</div>
                 <div className="recipe-text">Category</div>
               </li>
               <li className="recipe-item" style={divStyle2}>
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
      </div>
    </div>
  )
}

export default RecipeShow;


// This page shows the recipe
