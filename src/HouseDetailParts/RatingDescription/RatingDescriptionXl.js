import React from 'react';
import ReactStars from 'react-stars'

class RatingDescriptionXl extends React.Component{

    renderRating () {
      if (Number(this.props.homeData.rating)>=0) {
        return(

          <div className="rating">
          <ReactStars
            count={5}
            size={18}
            value={this.props.homeData.rating}
            edit={false}
            color2={'#ffd700'} />
          </div>
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

export default RatingDescriptionXl;
