import React from 'react';
import { Button } from 'react-bootstrap';
import './Images.css';

// import HouseDetails from './HouseDetails'
// import {BrowserRouter,Route} from 'react-router-dom';
const styles = {
  height :80,
}
class SearchResult extends React.Component {
  constructor(props){
    super(props);
  }
  id(){
    return this.props.id;
  }
  price(){
    return this.props.price;
  }
  rating(){
    return this.props.rating;
  }
  location(){
    return this.props.location;
  }
  title(){
    return this.props.title;
  }
  preview(){
    return this.props.preview;
  }
  images(){
    return this.props.images;
  }
  owner(){
    return this.props.owner;
  }
  latitude(){
    return this.props.latitude;
  }
  longitude(){
    return this.props.longitude;
  }
  changeURL(){
    if (window.location.href.indexOf('rooms') === -1){
      window.location.href = '/'+ this.props.id;
    }
    else{
      return;
    }
  }
  render ()
   {
    return(
        <div  style={{marginBottom:100}}>
          <div className = "image">
            <img src= {this.props.preview}  responsive = "true"  className="SearchResultPreview" alt = "" />
          </div>
          <div className = "title">
            <p align = "left">{this.title()}</p>
          </div>
          <div className ="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
          </div>
          <div className = "price">
            <p> {this.price()} تومان / هر شب </p>
          </div>
          <div className = "location">
            <p>{this.location()} </p>
          </div>
          <Button style={styles} onClick = {() => this.changeURL()}>
          بزن بریم </Button>
        </div>
    );
  }
}
export default SearchResult;
