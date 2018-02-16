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
      document.addEventListener('scroll', this.handleScroll);
    }

  componentWillUnmount= ()=> {
      document.removeEventListener('scroll', this.handleScroll);
    }

  handleScroll = (event)=>{
    if(event.pageY<400){
      this.setState({activeLink:2});
    }
    if(event.pageY>600 && event.pageY<1000){
      this.setState({activeLink:1});
    }
    if(event.pageY>1000 && event.pageY<1200){
      this.setState({activeLink:3});
    }
    if(event.pageY>1200){
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


 renderGallery(){
   console.log(this.state.homeData);
   var imageList = this.state.homeData.images.map(
     image=>{return(
        <img src={"https://www.trypinn.com"+image.image} className="house-details-preview" width="540" height="480" alt = ""/>
     )}
   );
   if(this.state.homeData!==''){
     return(
          <div className="house-details-gallery">
            <img src={"https://www.trypinn.com"+ this.state.homeData.preview_high} className="house-details-preview" width="540" height="480" alt = ""/>
            <div className="row-reverse">
              {imageList}
            </div>
            <div className="house-details-gallery-show-more">
            مشاهده تصاویر
            </div>
          </div>
     );
   }
 }
 // <Carousel swiping={true} slidesToShow={3}>
 //   {imageList}
 // </Carousel>

  renderHouseDetailsVersion2(){
    if(this.state.homeData!==''){
      return(
        <div className="house-details-main-division">
          <div className="house-details-top-division">
            <Element name="gallery"></Element>
            <div className="house-details-gallery">
              {this.renderGallery()}
            </div>
            <div className="house-details-main-information">
              <Element name="details"></Element>
              {this.renderHomeTitle()}
              <AddressDescription homeData={this.state.homeData}/>
              <AmenitiesDescription homeData={this.state.homeData} />
            </div>
          </div>
          <div className="house-details-bottom-division">
            <Sticky topOffset={604} bottomOffset={210}>
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
            <div>
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
              <div className="house-details-contents">
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
                      lat={this.state.homeData.latitude} lng={this.state.homeData.longitude} zoom={13}/>
                  </div>
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
