import React from 'react';
import { Link } from 'react-router';

const LandingPage = props => {
  return (
    <div>
      <div className="backgroundimage">
        <div className="container">
          <div className="main">
            <h1>HELLO!</h1>
            <h2 className="btn-main"><Link to='/recipes/new'> add your recipe</Link></h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
