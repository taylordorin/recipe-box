import React, { Component } from 'react';

class MeasurementTile extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="measurement-container-drop">
        <img className="measurement-container-pic" src={assetHelper["measurements.png"]}></img>
      </div>
    )
  }
}

export default MeasurementTile;
