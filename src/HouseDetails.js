import React from 'react';
import MainStarRating from './StarRating.js';
import Map from './Map.js';
import MainCarousel from './Carousel.js';


class HouseDetails extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      homeData : '',
      token: null,
      searchParams : {
        id: null,
      }
    };
  }
  componentWillMount() {
    this.setState({
      token: "2df579cfc86d929b9a9228bdcd265345addf8cb4",
    }, () => {this.setSearchParams(56)
    });
  }
  setSearchParams(houseId){
    var spar = {
      id : houseId,
    };
    this.setState({
      searchParams: spar
    }, () => {
    this.getDataFromServer();
    });
  }
  getHouseId(){
    return parseInt(window.location.href.split("/")[window.location.href.split("/").length-1] , 10);
  }
  getDataFromServer(){
    var request = new Request('https://www.trypinn.com/api/get/room/', {
      method: 'POST',
      body: JSON.stringify({
        room_id : this.getHouseId(),
    }),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((homeData) => {
     this.renderData(homeData);
   });
  }
  setToken() {
    this.setState({
      token: "2df579cfc86d929b9a9228bdcd265345addf8cb4",});
  }
  renderData(houseData) {
    // console.log(houseData.room)
    this.setState({homeData:houseData.room});
   }
   renderHomeTitle()
   {
     return (
       <div className="title">
       <p align="left">{this.state.homeData.title}</p>
       </div>
     );
   }
   renderRules(){
     const smoking=this.state.homeData.smoking_allowed
     const pet=this.state.homeData.pet_allowed
     const party=this.state.homeData.party_allowed
     if(smoking,pet,party==false){
       return(
         <div className="rules"><p>no smoking</p>
         <p>no pet</p>
         <p>no party</p><p>{this.state.homeData.special_rules}</p></div>
       );
     }
   }
   renderUtilities () {
     if (this.state.homeData.private_util_options) {
       const util1=this.state.homeData.private_util_options;
       const util1list=util1.map((util1)=><ul key={util1}>{util1}</ul>);
       const util2=this.state.homeData.general_util_options;
       const util2list=util2.map((util2)=><ul key={util2}>{util2}</ul>);
       return(
         <ul className="utilities">امکانات: {util1list}{util2list}</ul>
       );
     }
     return null;
   }
   renderHost () {
     if (this.state.homeData.owner) {
       return(
         <div className="host-first-name">مشخصات میزبان {this.state.homeData.owner.first_name}{this.state.homeData.owner.last_name}</div>
       );
     }
     return null;
   }
   renderCheckOut(){
     if(this.state.homeData.check_out){
     const checkout=this.state.homeData.check_out;
     const checkout1=checkout.split(":", 2);
     return(
       <div className="check-out"> check out time is on : {checkout1[0]+":"+checkout1[1]}</div>
     );
   }
   return null;
 }

 renderCheckIn(){
  if(this.state.homeData.check_in_from){
   const checkin=this.state.homeData.check_in_from;
   const checkintill=this.state.homeData.check_in_till;
   const checkin1=checkin.split(":", 2);
   const checkintill1=checkintill.split(":", 2);
   return(
     <div className="check-in"> check in time is on : {checkin1[0]+":"+checkin1[1]+" "+"till"+" "+checkintill1[0]+":"+checkintill1[1]}</div>
   );
 }
 return null;
 }

  render() {
    return(
      <div>
        {console.log(this.state.homeData)}
        <div className = "image">
        <img src= {"https://www.trypinn.com" + this.state.homeData.preview}  responsive = "true"  className="SearchResultPreview" alt = "" />
        </div>
        {this.renderHomeTitle()}
        <div className="rating">
          <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div className = "price">
          <p> {this.state.homeData.price} تومان / هر شب </p>
        </div>
        <div className = "address">
          <p>{this.state.homeData.address} </p>
        </div>
        {this.renderHost()}
        <div className="host-photo">
         <p><img src="{this.state.homeData.owner.profile_picture}" alt="تصویر میزبان"/></p>
        </div>
        <div className="capacity">
         <p>ظرفیت: {this.state.homeData.capacity}</p>
        </div>
        <div className="num-bath">
         <p>تعداد حمام: {this.state.homeData.bath_room_number}</p>
        </div>
        <div className="num-room">
         <p>تعداد اتاق ها:{this.state.homeData.rooms_number}</p>
        </div>
        <div className="num-bed">
         <p>تعداد تخت های تکنفره: {this.state.homeData.beds_number}</p>
        </div>
        <div className="description">
         <p>توضیحات: {this.state.homeData.description}</p>
        </div>
        <div className="max-capacity"><p> حداکثر ظرفیت: {this.state.homeData.max_capacity}</p></div>
        {this.renderRules()}
        {this.renderUtilities()}
        {this.renderCheckIn()}
        {this.renderCheckOut()}
        <MainStarRating
        value={this.state.homeData.rating}/>
        <div className="rating-number"><p>{this.state.homeData.rating_no}</p></div>
        <Map
          zoom={8}
          lat={this.state.homeData.latitude}
          lng={this.state.homeData.longitude}
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
         loadingElement={<div style={{ height: `100%` }} />}
         containerElement={<div style={{ height: `400px` }} />}
         mapElement={<div style={{ height: `100%` }} />} />

       <MainCarousel
        pic={this.state.homeData.images} />
        <div><p>nothing</p><p>nothing</p></div>
      </div>);
    }
  }
export default HouseDetails;
