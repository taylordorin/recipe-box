import React from 'react';

const NewRecipeForm = props => {
  return (
    <div className="large-6 columns">
      <label>{props.label}
        <input
          name={props.name}
          onChange={props.handlerFunction}
          type='text'
          value={props.content}
        />
      </label>
    </div>
  )
}

export default NewRecipeForm
