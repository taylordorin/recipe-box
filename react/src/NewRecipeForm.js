import React from 'react';

const NewRecipeForm = props => {
  return(
    <form onSubmit={props.handleSubmit}>
      Recipe: <input type='text' value={props.name} onChange={props.handleNameChange}/>
    </form>
  )
}

export default NewRecipeForm
