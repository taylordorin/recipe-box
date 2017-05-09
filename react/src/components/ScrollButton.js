import React, { Component } from 'react';
import { browserHistory } from 'react-router'

class ScrollButton extends Component {
  constructor() {
    super();
    this.state = {
      intervalId: 0
    };
    this.scrollStep = this.scrollStep.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render () {
    return(
      <div>
        <button title='Back to top' className='scroll' onClick={ () => { this.scrollToTop(); }}>
          <i className="fa fa-arrow-up"></i>
        </button>
      </div>
    )
  }
}


export default ScrollButton;
