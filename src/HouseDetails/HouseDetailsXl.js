import React from 'react';
import Lightbox from 'react-image-lightbox';
import scrollToComponent from 'react-scroll-to-component';
import {Divider} from 'semantic-ui-react';
import {Sticky} from 'react-sticky';
import {Button,Carousel,Image} from 'react-bootstrap';
import ReservePanel from '../HouseDetailParts/ReservePanel.js';
import AddressDescription from '../HouseDetailParts/AddressDescription';
import AmenitiesDescription from '../HouseDetailParts/AmenitiesDescription';
import RatingDescription from '../HouseDetailParts/RatingDescription';
import HostInfoDescription from '../HouseDetailParts/HostInfoDescription.js';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits.js';
import AspectRatio from 'react-aspect-ratio';
import MapDescription from '../HouseDetailParts/MapRenderer.js';
import {Modal} from 'react-bootstrap';
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
      imageLoaded:false,
      photoIndex: 0,
      isOpen: false,
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


   renderReservePanel(){
     if (this.state.showReservePanel === true){
       return <ReservePanel homeData={this.state.homeData}/>
     }
   }

   renderHomeTitle()
   {
     return (
       <p className='house-detail-titles' align="right">{this.state.homeData.title}</p>
     );
   }


 showHouseGallery(){
   this.setState({isOpen: true});
 }
 renderPreview(){
   if(this.state.homeData!==''){
     return(<div className = "housedetail-img">
              <AspectRatio ratio="16/10" style={{maxWidth: '100%'}}>
                 <img
                 onLoad={this.handleImageLoaded.bind(this)}
                 onClick={this.showHouseGallery.bind(this)}
                 src={"https://www.trypinn.com"+this.state.homeData.preview}  className="house-details-preview"
                 alt = ""/>
                 <Button onClick={this.showHouseGallery.bind(this)} className="show-gallery-button-house-details"> مشاهده تصاویر </Button>
              </AspectRatio>
             </div>);
   }
 }

 handleImageLoaded(){
   this.setState({ imageLoaded: true },()=>{});
 }

 renderHouseGallery(){
   if (this.state.homeData !==''){
     var imageList = [];
     for (var i = 0; i < this.state.homeData.images.length; i++) {
      imageList.push(
        "https://www.trypinn.com"+ this.state.homeData.images[i].image
      );
     }
     const photoIndex= this.state.photoIndex;
     return (
       <div>
       {this.state.isOpen && (
         <Lightbox
           mainSrc={imageList[photoIndex]}
           nextSrc={imageList[(photoIndex + 1) % imageList.length]}
           prevSrc={imageList[(photoIndex + imageList.length - 1) % imageList.length]}
           onCloseRequest={() => this.setState({ isOpen: false })}
           onMovePrevRequest={() =>
             this.setState({
               photoIndex: (photoIndex + imageList.length - 1) % imageList.length,
             })
           }
           onMoveNextRequest={() =>
             this.setState({
               photoIndex: (photoIndex + 1) % imageList.length,
             })
           }
         />
       )}
       </div>
     );
   }
 }

  renderMap(){
    if(this.state.homeData!==''){
      return (
          <div className='house-google-map'>
            <MapDescription
              lat={this.state.homeData.latitude} lng={this.state.homeData.longitude} zoom={13}
            />
          </div>
      );
    }
  }

  renderHouseDetails(){
      return(
        <div className={this.state.imageLoaded?"house-detail-image-loaded":"house-detail-image-not-loaded"}>
          <div className='housedetail container-fluid'>
            <div className="house-detail-top">
              <div className="house-detail-top-margined">
               <div className={this.state.imageLoaded?"loaded-message":"loading-message"} >
                loading message
                </div>
                <AddressDescription homeData={this.state.homeData}/>
                <div>
                  {this.renderHomeTitle()}
                </div>
                <div className='row-reverse-house-adress-type'>
                  <RatingDescription homeData={this.state.homeData}/>
                </div>
                <div>
                <div>
                  <div className='navigation-menu-housedetails'>
                    <Link to="details" spy={true} smooth={true} offset={-200} duration={800}>
                      <p className='navigation-menu-items'>مشخصات</p>
                    </Link>
                    <Link to="gallery" spy={true} smooth={true} offset={0} duration={800}>
                      <p className='navigation-menu-items' >تصاویر</p>
                    </Link>
                    <Link to="laws" spy={true} smooth={true} offset={-200} duration={800}>
                      <p className='navigation-menu-items'>امکانات و قوانین</p>
                    </Link>
                    <Link to="map" spy={true} smooth={true} offset={-200} duration={800}>
                      <p className='navigation-menu-items'>موقعیت روی نقشه</p>
                    </Link>
                  </div>
                </div>
                <div style={{textAlign:'right'}}>
                </div>
                </div>
              </div>
            </div>
            <div className='house-detail-top'>
              <div className="house-detail-top-margined">
                  <div className="col-md-3">
                    <Sticky topOffset={260} >
                    {({style})=>{
                      return(
                        <div style={style} className='reserve-card'>
                          <div className="reserve-card-child">
                            <p className="text-011">:هزینه هرشب اقامت</p>
                            <div className = "price">
                              <p className='text-012'> تومان</p>
                              <p className='text-012'> {englishToPersianDigits(this.state.homeData.price)} </p>
                            </div>
                            <div className="divider-card"></div>
                            <p className="text-011">:تعداد مهمان</p>
                            <div>
                              {this.renderReservePanel()}
                            </div>
                        </div>
                        </div>
                      );
                    }
                  }
                    </Sticky>
                  </div>
                  <div className='col-md-9'>
                    <Element name="gallery"></Element>
                    <div className='housedetail-img'>
                      {this.renderPreview()}
                      {this.renderHouseGallery()}
                    </div>
                    <Element name="details"></Element>
                    <AmenitiesDescription homeData={this.state.homeData} />
                    <br/>
                    <Divider/>
                    <div>
                      <HostInfoDescription homeData={this.state.homeData}/>
                      <p className='des-main-xs'> {this.state.homeData.description} </p>
                    </div>
                    <Divider/>
                    <Element name="laws" ></Element>
                    <p className='des-header-xl'> سایر امکانات </p>
                    <UtilitiesDescription homeData={this.state.homeData}/>
                    <Divider/>
                    <p className='des-header-xl'> قوانین و مقررات </p>
                      <div>
                        <div className="rules-half col-md-6">
                        <RulesDescription homeData= {this.state.homeData} />
                        </div>
                        <div className="rules-half col-md-6">
                        <CheckInCheckOutDescription homeData={this.state.homeData}/>
                        <MaxCapacity homeData={this.state.homeData}/>
                        </div>
                      </div>
                      <SpecialRule homeData={this.state.homeData}/>
                    <Element name="map"></Element>
                    <div className="padding10">
                    </div>
                      {this.renderMap()}
                    <div className="padding100">
                    </div>
                  </div>
              </div>

              </div>
            </div>
        </div>
      );
  }

  renderHouseDetailsVersion2(){
    <div className="house-details-main-division">
      <div className="house-details-top-division">
        <div className="house-details-gallery">
        </div>
        <div className="house-details-main-information">
        </div>
      </div>
      <div className="house-details-bottom-division row-reverse">
        <div className="house-details-contents">
          <div className="house-details-menu-link-scrolls">
          </div>
          <div className="house-details-amenities-description">
            <div className="house-details-host-info">
            </div >
            <div className="house-details-amenities">
            </div>
            <div className="house-details-sleep-arrangements">
            </div>
          </div>
          <div className= "house-details-rules">
          </div>
          <div className="house-details-location">
            <div className="house-details-location-description">
            </div>
            <div className="house-details-map">
            </div>
          </div>
        </div>
        <div className="house-details-reserve-panel">
        </div>
      </div>
    </div>
  }

  // {this.renderHouseDetails()}
  render(){
    if (this.state.homeData !== ''){
      document.title = "تریپین | "  + this.state.homeData.title +  " در " + this.state.homeData.city;
    }
    return(
      <div>
        {this.renderHouseDetails()}
      </div>
    );
  }
}
export default HouseDetailsXl;
