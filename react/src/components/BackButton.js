import React from 'react';
import { browserHistory } from 'react-router'

const BackButton = () => {
  return(
    <div className="row">
      <div className="large-4 columns">
        <button className="recipe-button" onClick={browserHistory.goBack}>Back</button>
      </div>
    </div>
  )
}

export default BackButton;
