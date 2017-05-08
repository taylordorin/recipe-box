import React from 'react';
import { Link } from 'react-router';

function makeDiv(categoryName, imageName){
  let anchor = "#" + categoryName;
  let divEntry =
    <div className={imageName}><a href={anchor}>
      <div className="content">
        <div className="table">
          <div className="table-cell">
            {categoryName}
          </div>
        </div>
      </div>
    </a></div>;
    // console.log(divEntry)
    return divEntry;
}

const Boxes = props => {
  return (
    <div>
      <div>
        {makeDiv("Breakfast", "box bg img1")}
        {makeDiv("Lunch", "box bg img2")}
        {makeDiv("Appetizers", "box bg img3")}
        {makeDiv("Soups", "box bg img4")}
        {makeDiv("Salads", "box bg img5")}
        {makeDiv("Beef", "box bg img6")}
      </div>
      <div>
        {makeDiv("Chicken", "box bg img7")}
        {makeDiv("Pork", "box bg img8")}
        {makeDiv("Seafood", "box bg img9")}
        {makeDiv("Vegetables", "box bg img10")}
        {makeDiv("Desserts", "box bg img11")}
        {makeDiv("Other", "box bg img12")}
      </div>
    </div>
  )
}

export default Boxes;
