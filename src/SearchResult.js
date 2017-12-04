import React from 'react';
import { Button } from 'react-bootstrap';
import './Images.css';

const styles = {
  height :80,
}

class SearchResult extends React.Component


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
        <div  style={{marginBottom:100}}>
          <div className = "image">
            <img src= {this.props.image}  responsive  className="SearchResultPreview" alt = "" />

          </div>
          <div className = "title">
            <p align = "left">{this.title()}</p>
          </div>
          <div className ="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
          </div>
          <div className = "price">
            <p> {this.price()} تومان / هر شب  </p>
          </div>
          <div className = "location">
            <p>{this.location()} </p>
          </div>
          <Button style={styles}> بزن بریم </Button>
        </div>
    );
  }
}

export default SearchResult;
