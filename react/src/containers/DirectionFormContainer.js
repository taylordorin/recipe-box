import React from 'react';
import NewRecipeForm from '../components/NewRecipeForm';
import Select from '../components/Select';

class DirectionFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			step: '',
      stepCategories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
			direction: ''
    };
    this.handleStepChange = this.handleStepChange.bind(this);
		this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.sendInstructionToForm = this.sendInstructionToForm.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  handleClearForm(event) {
  event.preventDefault();
  this.setState({
    step: '',
		direction: ''
  });
}

sendInstructionToForm() {
  let instruction = {
    step: this.state.step,
    direction: this.state.direction
  };
  console.log(instruction);
  this.props.addInstruction(instruction);
  this.handleClearForm(event);
}

handleStepChange(event) {
  console.log("handle skill change called");
  let newStep = event.target.value;
  this.setState({
    step: newStep
  });
}

handleDirectionChange(event) {
  console.log("handle skill change called");
  let newDirection = event.target.value;
  this.setState({
    direction: newDirection
  });
}
  render() {
    return (
      <div >
        <Select
          handlerFunction = {this.handleStepChange}
          label = 'Step:'
          name = 'step'
          options = {this.state.stepCategories}
          selectedOption = {this.state.step}
        />

        <NewRecipeForm
          content = {this.state.direction}
          label = 'Direction:'
          name = 'direction'
          handlerFunction = {this.handleDirectionChange}
        />
        <input type="button" className="button" value="Add Direction" onClick={this.sendInstructionToForm}/>
      < /div >
    )
  }
}

export default DirectionFormContainer;
