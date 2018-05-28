import React from 'react';
import {productionURL} from '../../Data.js';
import {englishToPersianDigits} from '../../tools/EnglishToPersianDigits.js';
import {parsePrice3digits} from '../../tools/ParsePrice3digits.js';
import ScrollArea from 'react-scrollbar';


class BookmarkListXl extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      bookmarkList : null,
    }
  }

  componentWillMount(){
    this.setState({token:this.getRelevantToken()},()=>{this.setSearchParams(this.getRole())});
  }

  getRelevantToken(){
    return localStorage['token'];
  }


  getRole(){
    return 'guest';
  }

  setSearchParams(person_role){
    this.setState({role :person_role } ,()=>this.getBookmarkListFromServer());
  }

  getBookmarkListFromServer(){
    var request = new Request(productionURL + 'bookmark/api/list/',{ //
      method: 'POST',
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+ this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((list) => {
     this.setState({bookmarkList:list.faved_rooms});
   });
  }

  getServiceType(data){
    switch(data.service_type){
      case "ENTIRE_HOME":
        return ' دربست ';
      case "PRIVATE_ROOM":
        return ' اتاق اختصاصی';
      case "SHARED_ROOM":
        return ' اتاق مشترک';
      default :
        return null;
    }
  }
  renderRelevantRoom(data){
    switch(data.type){
      case 'room':{
        return(
            <p className="bookmark-item-type"> {this.getRoomType(data)} {this.getServiceType(data)}</p>
        );
      }
      case 'ecotourism':{
        return(
            <p className="bookmark-item-type"> اقامتگاه بوم‌گردی</p>
        );
      }
    }
  }

  getRoomType(data){
    switch(data.room_type){
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
  renderList(){
      var list =
        this.state.bookmarkList.map((item)=>{
        if(item.room===null){
          var data = item.eco_room;
        }
        else{
          var data = item.room;
        }
        return(
            <div>
              <div className="bookmark-item">
                <div className="bookmark-item-data">
                <img src={"https://www.trypinn.com"+data.preview} alt={data.title} className="bookmark-item-preview"/>
                <div className="bookmark-item-description">
                  <a href={"/"+ (data.type==="room"?"rooms/":"ecotourism/") + data.id } target="_blank" className = "bookmark-item-link">
                    <p className="bookmark-item-title">
                      {data.title}
                    </p>
                  </a>
                  {this.renderRelevantRoom(data)}
                  <p className="bookmark-item-type">
                    {data.address}
                  </p>
                  <div className="bookmark-item-bottom-section">
                  <p onClick={(event)=>{this.handleUnlike(event,data,item)}} className="bookmark-item-delete-button">
                    حذف از لیست
                  </p>
                  <p className="bookmark-item-price-details">
                  <span className="bookmark-item-price">
                     {englishToPersianDigits(parsePrice3digits(data.price))} تومان
                  </span>
                  <span className="bookmark-item-price-description">
                  {data.type==="room"?"/ هر شب عادی"  : "/ هر نفر هر شب"}
                  </span>
                  </p>
                  </div>
                </div>
                </div>
              </div>
              <hr className="bookmark-item-divider"/>
            </div>
        );
      }
    );
    return (
      <ScrollArea smoothScrolling={false} stopScrollPropagation={true} speed={1} className="bookmark-list-container" horizontal={false}>
        {list}
      </ScrollArea>
    );
  }

  removeItemFromList(item){
    var tempList = this.state.bookmarkList;
    for (var itemCounter=0 ; itemCounter<tempList.length;itemCounter++){
      if(item.id===tempList[itemCounter].id){
        tempList.splice(itemCounter, 1);
      }
    }
    this.setState({bookmarkList:tempList});
  }

  handleUnlike(event,data,item){
    this.removeItemFromList(item);
    switch(data.type){
      case "room":{
        var request = new Request(productionURL + 'bookmark/api/unlike/', {
          method: 'POST',
          body: JSON.stringify({
            room_id : data.id,
        }),
          headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
          'Authorization': 'Token '+this.state.token,})
        });
        fetch(request)
        .then((response) => {
          return response.json();
        })
        .then((unlikeResponse) => {
          if(unlikeResponse.successful===true){
          }
        });
        break;
      }
      case "ecotourism":{
        var request = new Request(productionURL + 'bookmark/api/unlike/', {
          method: 'POST',
          body: JSON.stringify({
            eco_room_id : data.id,
        }),
          headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
          'Authorization': 'Token '+this.state.token,})
        });
        fetch(request)
        .then((response) => {
          return response.json();
        })
        .then((unlikeResponse) => {
          if(unlikeResponse.successful===true){
          }
        });
        break;
      }
    }
  }

  renderBookmarkList(){
    if(this.state.bookmarkList!==null){
      if(this.state.bookmarkList.length!==0){
        return(
          <div className="bookmark-list-main-division">
            {this.renderList()}
          </div>
        );
      }
      else{
        return(
          <div className="bookmark-list-empty-icon">
            <img className="no-bookmark-icon" src={require("../../Images/nobookmark.png")} alt="" />
            <p className="no-bookmark-description"> لیست علاقه‌مندی های شما خالی است</p>
          </div>
        );
      }
    }
  }
  render(){
    return(
      <div className="user-panel-section-bookmark-version">
        {this.renderBookmarkList()}
      </div>
    );
  }
}

export default BookmarkListXl;
