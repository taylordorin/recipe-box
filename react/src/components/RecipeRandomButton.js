import React, { Component } from 'react';

class RecipeRandomContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ''
    }
    this.handleRandomClick = this.handleRandomClick.bind(this);
    this.randomFetch = this.randomFetch.bind(this);
  }

  handleRandomClick(event){
    event.preventDefault()
    this.randomFetch()
  }

  randomFetch() {
    fetch('/api/v1/randoms/', {
      credentials: "include",
      method: "GET"
    })
    .then(response => response.json())
    .then(body => {
      console.log(body)
    })
  }

  render() {
    return(
      <div>
        <h1>Hi there!</h1>
        <button className="random-button" onClick={this.handleRandomClick}>Random</button>
      </div>
    )
  }
}

export default RecipeRandomContainer;
