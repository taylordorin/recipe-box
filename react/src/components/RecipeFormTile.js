import React from 'react';

const RecipeFormTile = props => {
  let servingsOptionElements = props.servingsOptions.map(option =>{
    return (
      <option key={option} value={option}>{option}</option>
    );
  })

  let categoryOptionElements = props.categoryOptions.map(option =>{
    return (
      <option key={option} value={option}>{option}</option>
    );
  })

  let skillOptionElements = props.skillOptions.map(option =>{
    return (
      <option key={option} value={option}>{option}</option>
    );
  })

  return (
    <div>
      <div className="row">
        <div className="large-12 columns">
          <label>{props.recipeLabel}
            <input
              recipeName={props.recipeName}
              onChange={props.recipeHandlerFunction}
              type='text'
              value={props.recipeContent}
            />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="small-4 columns">
          <div className="row collapse">
            <label>{props.servingLabel}
              <select name={props.servingName} value={props.servingSelectedOption} onChange={props.servingHandlerFunction}>
                <option value=""></option>
                {servingsOptionElements}
              </select>
            </label>
          </div>
        </div>
        <div className="small-4 columns">
          <div className="row collapse">
            <label>{props.categoryLabel}
              <select name={props.categoryName} value={props.categorySelectedOptions} onChange={props.categoryHandlerFunction}>
                <option value=""></option>
                {categoryOptionElements}
              </select>
            </label>
          </div>
        </div>
        <div className="small-4 columns">
          <div className="row collapse">
            <label>{props.skillLabel}
              <select name={props.skillName} value={props.skillSelectedOption} onChange={props.skillHandlerFunction}>
                <option value=""></option>
                {skillOptionElements}
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeFormTile
