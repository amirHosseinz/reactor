import React from 'react';
import {Sticky} from 'react-sticky';
import ReservePanel from '../HouseDetailParts/ReservePanel.js';
import AddressDescription from '../HouseDetailParts/AddressDescription';
import AmenitiesDescription from '../HouseDetailParts/AmenitiesDescription';
import RatingDescription from '../HouseDetailParts/RatingDescription';
import HostInfoDescription from '../HouseDetailParts/HostInfoDescription.js';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits.js';
import MapDescription from '../HouseDetailParts/MapRenderer.js';
import UtilitiesDescription from '../HouseDetailParts/UtilitiesDescription.js';
import CheckInCheckOutDescription from '../HouseDetailParts/CheckInCheckOutDescription.js';
import MaxCapacity from '../HouseDetailParts/MaxCapacity.js';
import RulesDescription from '../HouseDetailParts/RulesDescription.js';
import SpecialRule from  '../HouseDetailParts/SpecialRule.js';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GuestNumber from '../HouseDetailParts/GuestNumber';
import {Link,Element} from 'react-scroll';
import './HouseDetails.css';

class HouseDetailsXl extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      className:'loaded',
      photoIndex: 0,
      isOpen: false,
      activeLink:1,
      homeData : '',
      reservePanelFixed : false,
      scrollListFixed:false,
      showReservePanel : true,
      token: null,
      searchParams : {
        id: null,
      }
    };
  }
  componentDidMount=()=> {
      window.addEventListener('scroll', this.handleScroll);
    }

  componentWillUnmount= ()=> {
      window.removeEventListener('scroll', this.handleScroll);
    }

  handleScroll = (event)=>{
    // console.log(event.pageY);
    if(event.pageY<400){
      this.setState({activeLink:2});
    }
    if(event.pageY>400 && event.pageY<1000){
      this.setState({activeLink:1});
    }
    if(event.pageY>1000 && event.pageY<1300){
      this.setState({activeLink:3});
    }
    if(event.pageY>1300){
      this.setState({activeLink:4});
    }
  }
  getRelevantToken(){
    if (this.state.isLoggedIn ==='true'){
      this.setState({
        token: localStorage['token'],
      }, () => {
        this.setSearchParams(this.getHouseId());
      });
    }
    else{
      this.setState({
        token: localStorage['token'],
      }, () => {
        this.setSearchParams(this.getHouseId());
      });
    }
  }

  componentWillMount() {
    this.getRelevantToken();
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
      token: localStorage['token'],});
  }

  renderData(houseData) {
    this.setState({homeData:houseData.room});
  }

   renderHomeTitle()
   {
     return (
       <p className='house-detail-titles' align="right">{this.state.homeData.title}</p>
     );
   }

 renderPreview(){
   var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      touchMove:false,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    var imageList = this.state.homeData.images.map(
      image=>{return(
        <div className = "housedetail-img">
         <img src={"https://www.trypinn.com"+image.image} className="house-details-preview" height="480" width="600" alt = ""/>
        </div>
      )}
    );
   if(this.state.homeData!==''){
     // console.log(this.state.homeData.images);
     return(
       <Slider autoFocus={true} {...settings}>
         <div className = "housedetail-img">
          <img src={"https://www.trypinn.com"+this.state.homeData.preview_high} height="480" width="600" className="house-details-preview" alt = ""/>
         </div>
         {imageList}
       </Slider>
     );
   }
 }

  renderHouseDetailsVersion2(){
    if(this.state.homeData!==''){
      return(
        <div className="house-details-main-division">
          <div className="house-details-top-division">
            <Element name="gallery"></Element>
            <div className="house-details-gallery">
              {this.renderPreview()}
            </div>
            <div className="house-details-main-information">
              <Element name="details"></Element>
              {this.renderHomeTitle()}
              <AddressDescription homeData={this.state.homeData}/>
              <AmenitiesDescription homeData={this.state.homeData} />
            </div>
          </div>
          <div className="house-details-bottom-division row-reverse">
            <Sticky topOffset={636} disableCompensation={false}>
              {({style,isSticky})=>{
                return(
                  <div style={style}>
                    <div className={isSticky?"house-details-reserve-panel-sticky housedetails-content-containers":"house-details-reserve-panel-not-sticky housedetails-content-containers"}>
                      <div className="house-details-reserve-panel-price-description">
                          <p className="house-details-price-pernight-label">هزینه هرشب اقامت:</p>
                          <div className = "house-details-price">
                            <span> {englishToPersianDigits(this.state.homeData.price)} </span>
                            <span> تومان</span>
                          </div>
                      </div>
                      <hr />
                      <div className="house-details-reserve-panel-form">
                        <ReservePanel homeData={this.state.homeData}/>
                      </div>
                    </div>
                  </div>
                )
              }}
            </Sticky>
            <div className="house-details-contents">
            <Sticky topOffset={750}>
              {({style,isSticky})=>{return(
                <div style={style} className={isSticky?"house-details-menu-link-scrolls-sticky":"house-details-menu-link-scrolls-not-sticky housedetails-content-containers"}>
                  <div className='navigation-menu-housedetails'>
                    <Link onClick={()=>{this.setState({activeLink:1})}} className={this.state.activeLink===1?'navigation-menu-items-active':'navigation-menu-items'} to="details" spy={true} smooth={true} offset={-100} duration={800}>
                      <p >مشخصات</p>
                    </Link>
                    <Link onClick={()=>{this.setState({activeLink:2})}} className={this.state.activeLink===2?'navigation-menu-items-active':'navigation-menu-items'} to="gallery" spy={true} smooth={true} offset={-200} duration={800}>
                      <p  >تصاویر</p>
                    </Link>
                    <Link onClick={()=>{this.setState({activeLink:3})}} className={this.state.activeLink===3?'navigation-menu-items-active':'navigation-menu-items'} to="laws" spy={true} smooth={true} offset={-200} duration={800}>
                      <p>امکانات و قوانین</p>
                    </Link>
                    <Link onClick={()=>{this.setState({activeLink:4})}} className={this.state.activeLink===4?'navigation-menu-items-active':'navigation-menu-items'} to="map" spy={true} smooth={true} offset={-200} duration={800}>
                      <p>موقعیت روی نقشه</p>
                    </Link>
                  </div>
                </div>
              )}}
            </Sticky>
              <div className="house-details-amenities-description housedetails-content-containers">
                <div className="house-details-host-info">
                  <HostInfoDescription homeData={this.state.homeData}/>
                  <p className='house-details-description-content house-description-top'> {this.state.homeData.description} </p>
                </div >
                <div className="house-details-amenities">
                  <p className="house-details-description-heading">
                    سایر امکانات
                  </p>
                  <UtilitiesDescription homeData={this.state.homeData} />
                </div>
                <div className="house-details-sleep-arrangements">
                </div>
              </div>
              <div className= "house-details-rules housedetails-content-containers">
                <Element name="laws" ></Element>
                <p className="house-details-description-heading">
                مقررات این اقامتگاه
                </p>
                <CheckInCheckOutDescription homeData={this.state.homeData}/>
                <MaxCapacity homeData={this.state.homeData}/>
                <RulesDescription homeData= {this.state.homeData} />
                <SpecialRule homeData={this.state.homeData}/>
              </div>
              <div className="house-details-location housedetails-content-containers">
                <div className="house-details-location-description">
                <p className="house-details-description-heading">
                  موقعیت اقامتگاه
                </p>
                <p className="house-details-description-content">
                  در نقشه زیر می توانید موقعیت حدودی اقامتگاه را مشاهده نمایید.
                  پس از
                  <span> رزرو اقامتگاه </span>
                  موقعیت و آدرس دقیق اقامتگاه و شماره تلفن میزبان
                  در اختیار شما قرار خواهد گرفت.
                </p>
                </div>
                <div className="house-details-map">
                  <Element name="map"></Element>
                  <MapDescription
                    lat={this.state.homeData.latitude} lng={this.state.homeData.longitude} zoom={13}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render(){
    if (this.state.homeData !== ''){
      document.title = "تریپین | "  + this.state.homeData.title +  " در " + this.state.homeData.city;
    }
    return(
      <div>
        {this.renderHouseDetailsVersion2()}
      </div>
    );
  }
}
export default HouseDetailsXl;
