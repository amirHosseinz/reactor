import React from 'react';
import { Button } from 'react-bootstrap';
import './Images.css';
import { englishToPersianDigits } from './tools/EnglishToPersianDigits';

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

  price () {
    return englishToPersianDigits(this.props.room.price);
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
        <div  className="result-detail">
          <div className="search-result-image">
            <a  href="#" onClick={() => this.showHouseDetail()}>
              <img src= {this.props.preview}   className="SearchResultPreview" alt = "پیشنمایش خانه "  />
             </a>
          </div>
          <div className = "result-title">
            <a  href="#" onClick={() => this.showHouseDetail()}> <p >{this.title()}</p> </a>
          </div>
          <div className ="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
          </div>
          <div className = "result-price">
            <p> {this.price()}</p>
            <p className="toman-per-night-result">  تومان / هر شب </p>
          </div>
          <div className="result-card-margins">
          </div>
        </div>
    );
  }
}
export default SearchResult;
