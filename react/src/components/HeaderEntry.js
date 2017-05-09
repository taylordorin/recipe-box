import React from 'react';
import { Link } from 'react-router';

const HeaderEntry = props => {
  return (
    <div>
      <div className="recipe-header" id={props.category}>{props.category}</div>
      <div className='line-break'>
        <img className="linebrk-img" src={assetHelper["linebrk.png"]}></img>
      </div>
    </div>
  )
}

export default HeaderEntry;
// <h1>{props.category}</h1>
