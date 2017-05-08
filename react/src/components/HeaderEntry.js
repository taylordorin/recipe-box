import React from 'react';
import { Link } from 'react-router';

const HeaderEntry = props => {
  return (
    <div className="" id={props.category}><h1>{props.category}</h1></div>
  )
}

export default HeaderEntry;
// <h1>{props.category}</h1>
