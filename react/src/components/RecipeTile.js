import React from 'react';
import { browserHistory, Link } from 'react-router';

const RecipeTile = ({ id, recipe_name, category, cook_time, skill_level }) => {
  const divStyle = {
      borderRight: '1pt solid grey',
      width: '129px'
    };
  const divStyle2 = {
      borderRight: '1pt solid grey',
    };
  return(
    <div className="recipe-container">
      <div className="recipe-content">
         <h1 className="heading-1">
           <Link to={`/recipes/${id}`}>{recipe_name}</Link>
         </h1>
         <ul className="recipe-list meta">
           <li className="recipe-item" style={divStyle}>
             <div className="recipe-value">{category}</div>
             <div className="recipe-text">Category</div>
           </li>
           <li className="recipe-item" style={divStyle2}>
             <div className="recipe-value">{cook_time}</div>
             <div className="recipe-text">Mins</div>
           </li>
           <li className="recipe-item">
             <div className="recipe-value">{skill_level}</div>
             <div className="recipe-text">Skill Level</div>
           </li>
         </ul>
      </div>
    </div>
  )
}

export default RecipeTile;


// this is for the front page!!!
