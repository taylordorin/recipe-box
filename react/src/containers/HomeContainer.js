import React, { Component } from 'react';
import { Link } from 'react-router';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1>Hello</h1>
        <span className="button"><Link to='/recipes/new'> New Recipe </Link></span>
      </div>
    )
  }
}

export default HomeContainer;
