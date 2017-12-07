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
    this.showHouseDetails = this.showHouseDetail.bind(this);
  }
  id(){
    return this.props.room.id;
  }
  price(){
    return this.props.room.price;
  }
  rating(){
    return this.props.toom.rating;
  }
  location(){
    return this.props.room.location;
  }
  title(){
    return this.props.room.title;
  }
  preview(){
    return this.props.preview;
  }
  showHouseDetail(){
    window.open('./rooms/' + this.props.room.id);
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
          <Button style={styles} onClick = {() => this.showHouseDetail()}>
          بزن بریم </Button>
        </div>
    );
  }
}
export default SearchResult;
