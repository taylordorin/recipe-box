import React from 'react';

const IngredientFormTile = props => {
  let unitOptionElements = props.unitOptions.map(option =>{
    return (
      <option key={option} value={option}>{option}</option>
    );
  })

  return (
    <div>
      <div className="row">
        <div className="small-2 columns">
          <label>{props.quantityLabel}
            <input
              quantityName={props.quantityName}
              onChange={props.quantityHandlerFunction}
              type='text'
              value={props.quantityContent}
            />
          </label>
        </div>

        <div className="small-2 columns">
          <div className="row collapse">
            <label>{props.unitLabel}
              <select name={props.unitName} value={props.unitSelectedOption} onChange={props.unitHandlerFunction}>
                <option value=""></option>
                {unitOptionElements}
              </select>
            </label>
          </div>
        </div>

        <div className="small-8 columns">
          <div className="row collapse">
            <label>{props.ingredientLabel}
              <input
                ingredientName={props.ingredientName}
                onChange={props.ingredientHandlerFunction}
                type='text'
                value={props.ingredientContent}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IngredientFormTile
