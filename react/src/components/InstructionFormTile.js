import React from 'react';

const InstructionFormTile = props => {
  let stepOptionElements = props.stepOptions.map(option =>{
    return (
      <option key={option} value={option}>{option}</option>
    );
  })

  return (
    <div>
      <div className="row">
        <div className="small-2 columns">
            <label>{props.stepLabel}
              <select name={props.stepName} value={props.stepSelectedOption} onChange={props.stepHandlerFunction}>
                <option value=""></option>
                {stepOptionElements}
              </select>
            </label>
          </div>

        <div className="small-10 columns">
          <div className="row collapse">
            <label>{props.instructionLabel}
              <textarea
                instructionName={props.instructionName}
                onChange={props.instructionHandlerFunction}
                type='text'
                value={props.instructionContent}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructionFormTile
