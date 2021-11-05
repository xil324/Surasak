/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import Star from './Icons/Star.jsx';

const StarRatingStatic = ({ rating }) => (
  <div className="star-container">
    <div className="layer1">
      {
        [...Array(5)].map(() => <Star color="#e3e8e4" />)
      }
    </div>
    <div className="layer2" style={{ width: `${5 * rating}em` }}>
      {
        [...Array(5)].map(() => <Star color="#ffc110" />)
      }
    </div>
  </div>
);

export default StarRatingStatic;
