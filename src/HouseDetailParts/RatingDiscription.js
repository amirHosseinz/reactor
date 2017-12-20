import React from 'react';
import MainStarRating from './StarRating.js';

class RatingDiscription extends React.Component{
  render(){
    return (
      <div className="rating-div">
        <MainStarRating value={this.props.homeData.rating}/>
      </div>
    );
  }
}

export default RatingDiscription;
