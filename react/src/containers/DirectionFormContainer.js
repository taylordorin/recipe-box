import React from 'react';
import NewRecipeForm from '../components/NewRecipeForm';
import Select from '../components/Select';

class DirectionFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
			step: '',
      stepCategories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
			direction: ''
    };
    this.handleStepChange = this.handleStepChange.bind(this);
		this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.sendInstructionToForm = this.sendInstructionToForm.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);

    this.validateStepChange = this.validateStepChange.bind(this);
    this.validateDirectionChange = this.validateDirectionChange.bind(this);
  }
    handleClearForm(event) {
    event.preventDefault();
    this.setState({
      step: '',
  		direction: ''
    });
  }

  sendInstructionToForm() {
    if (
      this.validateStepChange(this.state.step) &&
      this.validateDirectionChange(this.state.direction)
    ) {
      let instruction = {
        step: this.state.step,
        direction: this.state.direction
      };
      console.log(instruction);
      this.props.addInstruction(instruction);
      this.handleClearForm(event);
    }
  }

  handleStepChange(event) {
    this.validateStepChange(event.target.value);
    let newStep = event.target.value;
    this.setState({
      step: newStep
    });
  }

  handleDirectionChange(event) {
    this.validateDirectionChange(event.target.value);
    let newDirection = event.target.value;
    this.setState({
      direction: newDirection
    });
  }

  validateStepChange(stepField) {
    if (stepField === '' || stepField === ' ') {
      let newError = {step: 'Step may not be blank.' };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    }else{
      let errorState = this.state.errors;
      delete errorState.step;
      this.setState({ errors: errorState });
      return true;
    }
  }

  validateDirectionChange(directionField) {
    if (directionField === '' || directionField === ' ') {
      let newError = {direction: 'Direction field may not be blank.' };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    }else{
      let errorState = this.state.errors;
      delete errorState.direction;
      this.setState({ errors: errorState });
      return true;
    }
  }

  render() {
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }
    return (
      <div >
      {errorDiv}
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
