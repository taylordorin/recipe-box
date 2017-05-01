import React from 'react';

const Select = props => {
  let optionElements = props.options.map(option =>{
    return (
      <option key={option} value={option}>{option}</option>
    );
  })

  return (
    <div className="large-6 columns">
    <label>{props.label}
      <select name={props.name} value={props.selectedOption} onChange={props.handlerFunction}>
        <option value=""></option>
        {optionElements}
      </select>
    </label>
    </div>
  );
}

export default Select;
