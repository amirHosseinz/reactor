import React from 'react';

class HouseDetails extends React.Component
 {
  price()
  {
    return this.props.price
  }
  rating()
  {
    return this.props.rating
  }
  location()
  {
    return this.props.location
  }
  title()
  {
    return this.props.title
  }
  image()
  {
    return this.props.image
  }
  render ()
   {
    return(
        <div>
          <div className = "image">
          <img src= {this.props.image} height = "200" width = "200" alt = "" />
          </div>
          <div className = "title">
          <p align = "left">{this.title()}</p>
          </div>
          <div className ="rating">
          <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
          </div>
          <div className = "price">
          <p> {this.price()} $ per night</p>
          </div>
          <div className = "location">
          <p>{this.location()} </p>
          </div>
        </div>
    );
  }
}

export default HouseDetails;
