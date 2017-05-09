import React from 'react';
import { browserHistory, Link } from 'react-router';

const RandomRecipeTile = ({ id, recipe_name, category, cook_time, skill_level }) => {
  const divStyle = {
      borderRight: '1pt solid grey',
      width: '129px'
    };
  const divStyle2 = {
      borderRight: '1pt solid grey',
    };
  return(
    <div className='random-border'>
      <div className="random-recipe-container">
        <div className="random-recipe-content">
           <div>
             <a className="random-heading-1" href={`/recipes/${id}`}>{recipe_name}</a>
           </div>
           <ul className="random-recipe-list meta">
             <li className="random-recipe-item" style={divStyle}>
               <div className="random-recipe-value">{category}</div>
               <div className="random-recipe-text">Category</div>
             </li>
             <li className="random-recipe-item" style={divStyle2}>
               <div className="random-recipe-value">{cook_time}</div>
               <div className="random-recipe-text">Servings</div>
             </li>
             <li className="random-recipe-item">
               <div className="random-recipe-value">{skill_level}</div>
               <div className="random-recipe-text">Skill Level</div>
             </li>
           </ul>
        </div>
      </div>
    </div>
  )
}

export default RandomRecipeTile;


// this is for the front page!!!
