import React from 'react';
import RatingDescriptionSm from './RatingDescription/RatingDescriptionSm.js';
import RatingDescriptionMd  from './RatingDescription/RatingDescriptionMd.js';
import RatingDescriptionXl  from './RatingDescription/RatingDescriptionXl.js';
import RatingDescriptionXs  from './RatingDescription/RatingDescriptionXs.js';
import ReactStars from 'react-stars'

class RatingDescription extends React.Component{

  renderRatingDescriptionXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <RatingDescriptionXl {...props}/>
      </div>
    );
  }

  renderRatingDescriptionXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <RatingDescriptionXs {...props}/>
      </div>
    );
  }

  renderRatingDescriptionMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <RatingDescriptionMd {...props}/>
      </div>
    );
  }

  renderRatingDescriptionSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <RatingDescriptionSm {...props}/>
      </div>
    );
  }


  render(){
    return (
      <div>
      {this.renderRatingDescriptionXl(this.props)}
      {this.renderRatingDescriptionXs(this.props)}
      {this.renderRatingDescriptionMd(this.props)}
      {this.renderRatingDescriptionSm(this.props)}
      </div>
    );
  }
}

export default RatingDescription;
