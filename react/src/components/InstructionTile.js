import React from 'react';

const InstructionTile = (props) => {
  return(
    <div className="row">
        <div className="recipe-container">
          <div className="ingredient-show ">
             <div className="recipe-text">{props.step} {props.direction} </div>
          </div>
        </div>
    </div>
  )
}

export default InstructionTile;
