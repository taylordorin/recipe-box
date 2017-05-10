import React, { Component } from 'react';
import RecipeShowContainer from '../containers/RecipeShowContainer'

class InstructionTile extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let hidden;
    if (true === this.props.hidden) {
      hidden = 'hidden';
    } else {
      hidden = '';
    }

    let plusMinusIcon;
    let openbutton;
    if (this.props.hidden) {
      plusMinusIcon = `${this.props.step}`;
      openbutton = "openbutton plus";
    } else {
      plusMinusIcon = '▶';
      openbutton = "openbutton minus";
    }

    return(
      <div className="row">
        <div className="large-1 columns">
          <div className={openbutton}
            onClick={this.props.handleClick}>{plusMinusIcon}
          </div>
        </div>
        <div className="large-11 columns">
          <p className={hidden}>{this.props.direction}</p>
        </div>
      </div>
    )
  }
}

export default InstructionTile;
