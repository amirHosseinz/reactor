import React from 'react';
import MainStarRating from './StarRating.js';

class RatingDiscription extends React.Component{
  renderRating () {
    if (Number(this.props.homeData.rating)>0) {
      return(
        <MainStarRating value={this.props.homeData.rating} />
      );
    } else {
      return null;
    }
  }

  render(){
    return (
      <div className="rating-div">
        {this.renderRating()}
      </div>
    );
  }
}

export default RatingDiscription;
