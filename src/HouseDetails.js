import React from 'react';
import ReservePanel from './ReservePanel.js';
import MainStarRating from './StarRating.js';
import Map from './Map.js';
import MainCarousel from './Carousel.js';
import { Icon,Button} from 'semantic-ui-react';

class HouseDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      homeData : '',
      showReservePanel : false,
      token: null,
      searchParams : {
        id: null,
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }
  getRoomType(){
    switch(this.state.homeData.room_type){
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
    switch(this.state.homeData.service_type){
          case "ENTIRE_HOME":
            return 'دربست';
          case "PRIVATE_ROOM":
            return 'اتاق اختصاصی';
          case "SHARED_ROOM":
            return 'اتاق مشترک';
    }

  }
  componentWillMount() {
    this.setState({
      token: "2df579cfc86d929b9a9228bdcd265345addf8cb4",
    }, () => {
      this.setSearchParams(this.getHouseId());
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
        room_id : this.state.searchParams.id,
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
    console.log(houseData.room);
    this.setState({homeData:houseData.room});
   }

   handleClick(){
     this.setState({showReservePanel : true});
   }

   renderReservePanel(){
     if (this.state.showReservePanel === true){
       return <ReservePanel homeData = {this.state.homeData}/>
     }
   }

   renderHomeTitle()
   {
     return (
       <p className='house-detail-titles'align="right">{this.state.homeData.title}</p>
     );
   }

   renderRules(){
     const smoking=this.state.homeData.smoking_allowed
     const pet=this.state.homeData.pet_allowed
     const party=this.state.homeData.party_allowed
     if (smoking===false){
            return(
              <div className="smoking">no smoking</div>
            )}
            if(party===false){
              return(
               <div className="party">no party</div>
              )
            }
            if(pet===false){
              return(
               <div className="pet">no pet</div>
              )
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
         <div> <p className="text-011">{this.state.homeData.owner.first_name} {this.state.homeData.owner.last_name}</p></div>
       );
     }
     return null;
   }
   renderHostPhoto(){
       if (this.state.homeData !== ''){
         console.log(this.state.homeData.owner);
         return(
           <div className="host-photo">
            <p><img className="host-img" src={"https://www.trypinn.com/" +this.state.homeData.owner.profile_picture} alt="تصویر میزبان"/></p>
           </div>
         );
       }
     }
   renderCheckOut(){
     if(this.state.homeData.check_out){
     const checkout=this.state.homeData.check_out;
     const checkout1=checkout.split(":", 2);
     return(
       <div className="check-out"> ساعت خروج: {checkout1[0]+":"+checkout1[1]}</div>
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
     <div className="check-in"> ساعت ورود: {checkin1[0]+":"+checkin1[1]+" تا "+checkintill1[0]+":"+checkintill1[1]}</div>
   );
 }
 return null;
 }

 renderPreview(){
   if(this.state.homeData!==''){
     return(<div className = "housedetail-img">
             <img src= {"https://www.trypinn.com" + this.state.homeData.preview}  className="house-details-preview" alt = "" />
             </div>);
   }
 }

  render() {

    return(
      <div className='housedetail container-fluid'>
        <div className="house-detail-top">
          <div className="house-detail-top-margined">
            <div className='row-reverse-house-adress-type'>
              <p>{this.getRoomType()}</p>
              <p>{this.getServiceType()}</p>
              <p> /</p>
              <p>{this.state.homeData.address} </p>
            </div>
            <div> {this.renderHomeTitle()}</div>
            <div className='row-reverse-house-adress-type'>
              <MainStarRating
              value={this.state.homeData.rating}/>
              <p>{this.state.homeData.rating_no}</p>
            </div>
            <div className='navigation-menu-housedetails'>
              <p className='navigation-menu-items'>مشخصات</p>
              <p className='navigation-menu-items'>تصاویر</p>
              <p className='navigation-menu-items'>امکانات و قوانین</p>
              <p className='navigation-menu-items'>موقعیت روی نقشه</p>
            </div>
          </div>
        </div>
      <div className='house-detail-top '>
        <div className="house-detail-top-margined">
          <div className='reserve-card col-md-3'>
            <p className="text-011">:هزینه هرشب اقامت</p>
            <div className = "price">
              <p className='text-012'> تومان {this.state.homeData.price}</p>
            </div>
            <div className='reserve-button-div'>
            <div>
              <button className="button" onClick ={this.handleClick}>Reserve House </button>
            </div>
            <div>
              {this.renderReservePanel()}
            </div>
            <div><p>nothing</p><p>nothing</p></div>
              <Button color='twitter' className='reserve-button'>
                !رزرو کنید
               </Button>
            </div>
          </div>
          <div className='housedetail-img col-md-9'>
            {this. renderPreview()}
            <div className="col-details-house">
            <div className="main-amanities row">
              <div className='main-amanities-item col-md-3'>
                  <img src="http://image.ibb.co/fWec9m/baths.png"  className="main-amanities-icon" alt = "" />
                  <p>حمام {this.state.homeData.bath_room_number} </p>
              </div>
              <div className='main-amanities-item col-md-3'>
                  <img src="http://image.ibb.co/kWoth6/beds.png"  className="main-amanities-icon" alt = "" />
                  <p>تخت {this.state.homeData.beds_number} </p>
              </div>
              <div className='main-amanities-item col-md-3'>
                  <img src="http://image.ibb.co/dNn8FR/rooms.png"  className="main-amanities-icon" alt = "" />
                  <p>اتاق {this.state.homeData.rooms_number} </p>
              </div>
              <div className='main-amanities-item col-md-3'>
                 <img src="http://image.ibb.co/hx4oFR/persons.png"  className="main-amanities-icon" alt = "" />
                 <p>مهمان {this.state.homeData.capacity} </p>
              </div>
              </div>
            <div className="main-descriptions row">
              <p className='des-header'> درباره این خانه </p>
              <p className='des-main'> {this.state.homeData.description} </p>
            </div>

            <div className="host-info">
                <div className="host-avatar">
                    {this.renderHostPhoto()}
                   <img src="http://svgshare.com/i/4V0.svg"  className="avatar-icon" alt = "" />
                </div>
                <div className="host-texts">
                  <p className="text-011">به میزبانی </p>
                  {this. renderHost()}
                </div>
            </div>

            <div className="main-descriptions row">
              <p className='des-header'>سایر امکانات</p>

              <p className='des-main'> {this.state.homeData.description} </p>


              <div className="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
              </div>


              <div className="host-photo">
               <p><img src="{this.state.homeData.owner.profile_picture}" alt="تصویر میزبان"/></p>
              </div>

              <div className="max-capacity"><p> حداکثر ظرفیت: {this.state.homeData.max_capacity}</p></div>
              {this.renderRules()}
              {this.renderUtilities()}
              {this.renderCheckIn()}
              {this.renderCheckOut()}


            <div className='special-rules'> {this.state.homeData.special_rules}</div>

            </div>


            <Map
              zoom={8}
              lat={parseFloat(this.state.homeData.latitude)}
              lng={parseFloat(this.state.homeData.longitude)}
              isMarkerShown={true}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYdvxvYa5_HuFrQMlTNWpbhan7nqIJuOE&v=3.exp&libraries=geometry,drawing,places"
             loadingElement={<div style={{ height: `100%` }} />}
             containerElement={<div style={{ height:`400px`,width:`100%`}} />}
             mapElement={<div style={{ height: `100%` }} />} />



            </div>
            </div>
          </div>
      </div>


       <MainCarousel
        pic={this.state.homeData.images} />


      </div>
    );
    }
  }

export default HouseDetails;
