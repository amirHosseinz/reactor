import React from 'react';
import './Images.css';
import { englishToPersianDigits } from './tools/EnglishToPersianDigits';
import AspectRatio from 'react-aspect-ratio';


class SearchResultItem extends React.Component {
  constructor(props){
    super(props);
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
    return this.props.room.address;
  }
  title(){
    return this.props.room.title;
  }
  preview(){
    return this.props.preview;
  }

  getRoomType(){
    switch(this.props.room.room_type){
      case "HOUSE":
        return 'خانه';
      case "SUITE":
        return 'سوییت';
      case "VILLA":
        return 'ویلای';
      case "APT":
        return 'آپارتمان';
      default:
        return null;
    }
  }
  getServiceType(){
    switch(this.props.room.service_type){
      case "ENTIRE_HOME":
        return 'دربست';
      case "PRIVATE_ROOM":
        return 'اتاق اختصاصی';
      case "SHARED_ROOM":
        return 'اتاق مشترک';
      default :
        return null;
    }
  }

  render ()
   {
    return(
      <div>
      <div>
        <a target="_blank" href={"/rooms/"+ this.props.room.id} className="card_anchor">
          <div  className="result-detail">
            <AspectRatio ratio="16/11" style={{maxWidth: '400px'}}>
                  <img src= {this.props.preview} className="imgresult" alt="پیشنمایش خانه "/>
            </AspectRatio>
              <div className="result-without-price">
                <div className = "result-room-type">
                  <p className="rooms_type_result"> {this.getRoomType()} </p>
                  <p className="rooms_type_result"> {this.getServiceType()} </p>
                  <p className="rooms_type_result"> {englishToPersianDigits(this.props.room.rooms_number)}</p>
                  <p className="rooms_type_result">خوابه</p>
                </div>
                <div className = "result-title">
                  <p>{this.title()}</p>
                </div>
                <div className="room_address_results">

                  <p>{this.props.room.address}</p>
                </div>

              </div>
                <div className = "result-price">
                  <p className="toman-per-night-result"> هر شب </p>
                  <p className="toman-per-night-result">/</p>
                  <p className="toman-result">تومان  </p>
                  <p className="toman-result"> {this.price()}</p>
                </div>
            <div className="result-card-margins">
            </div>
          </div>
          </a>
      </div>
      </div>
    );
  }
}
export default SearchResultItem;
