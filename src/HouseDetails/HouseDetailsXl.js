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
import DifferentPrices from '../HouseDetailParts/DifferentPrices.js';
import SpecialRule from  '../HouseDetailParts/SpecialRule.js';
import GuestNumber from '../HouseDetailParts/GuestNumber';
import {parsePrice3digits} from '../tools/ParsePrice3digits.js';
import Scrollchor from 'react-scrollchor';
import './HouseDetails.css';
import Lightbox from 'react-images';


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
      lightboxIsOpen:false,
      lightboxCurrentImage:0,
      searchParams : {
        id: null,
      }
    };
  }
  componentDidMount=()=> {
    }

  componentWillUnmount= ()=> {
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
    switch(window.location.href.split("/")[window.location.href.split("/").length-2]){
      case 'rooms':{
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
       return;
      }
      case 'ecotourism':{
        var request = new Request('https://www.trypinn.com/api/get/ecotourism/', {
          method: 'POST',
          body: JSON.stringify({
            ecotourism_id : this.state.searchParams.id,
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
      return;
    }
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
   var imageList = this.state.homeData.images.map(
     image=>{return(
        <img src={"https://www.trypinn.com"+image.image} className="house-details-preview" width="540" height="480" alt = ""/>
     )}
   );
   if(this.state.homeData!==''){
     return(
          <div onClick={()=>{this.setState({lightboxIsOpen:true})}} className="house-details-gallery">

            <img src={"https://www.trypinn.com"+ this.state.homeData.preview_high} className="house-details-preview" width="540" height="480" alt = ""/>
            <div className="row-reverse">
              {imageList}
            </div>
            <div onClick={()=>{this.setState({lightboxIsOpen:true})}}className="house-details-gallery-show-more">
            مشاهده تصاویر
            </div>
          </div>
     );
   }
 }


 renderGalleryLightBox(){
   var images = [];
   images.push({src:"https://www.trypinn.com"+ this.state.homeData.preview_high});
   for (var imageIndex=this.state.homeData.images.length-1;imageIndex>=0;imageIndex--){
     images.push({src:"https://www.trypinn.com"+ this.state.homeData.images[imageIndex].image});
   }
   var imagesLength = images.length;
   return(
     <Lightbox
    images={images}
    currentImage={this.state.lightboxCurrentImage}
    isOpen={this.state.lightboxIsOpen}
    onClickPrev={()=>{this.setState((prevState)=>{return({lightboxCurrentImage:(prevState.lightboxCurrentImage-1)%imagesLength})})}}
    showImageCount={false}
    onClickThumbnail={(currentImageIndex)=>{this.setState({lightboxCurrentImage:currentImageIndex})}}
    showThumbnails={true}
    onClickNext={()=>{this.setState((prevState)=>{return({lightboxCurrentImage:(prevState.lightboxCurrentImage+1)%imagesLength})})}}
    onClose={()=>{this.setState({lightboxIsOpen:false})}}
/>
   );
 }

 renderTourismPlaces(){
   if(this.state.homeData.tourism_attractions.length>0)
   return(
     <div className="house-details-tourism-places">
       <p className="house-details-description-heading">
        جاذبه‌های نزدیک
       </p>
       <div className="house-details-toursim-attraction">
         {this.state.homeData.tourism_attractions.map(attraction=>{
           return(
             <div className="house-details-tourism-attraction-item">{attraction}</div>
           );
         })}
       </div>
     </div>
   );
 }
 renderRelevantMapDescription(){
   switch(window.location.href.split("/")[window.location.href.split("/").length-2]){
     case 'rooms':{
       return(
        <div>
        </div>
       );
     }
     case 'ecotourism':{
       return(
           <div>
             {this.renderTourismPlaces()}
             {this.renderAccessibility()}
           </div>
       );
     }
   }
 }
 renderAccessibility(){
   if(this.state.homeData.accessibility.length>50){
     return(
       <div className="house-details-accessibility">
         <p className="house-details-description-heading">
            نحوه دسترسی
         </p>
         <p className="house-details-description-content">
          {this.state.homeData.accessibility.replace('-' , '')}
         </p>
       </div>
     );
   }
 }
  renderHouseDetailsVersion2(){
    if(this.state.homeData!=='' && this.state.homeData!==null){
      // console.log(this.state.homeData);
      return(
        <div className="house-details-main-division">
          <div className="house-details-top-division">
            <div id="gallery"></div>
            <div className="house-details-gallery">
              {this.renderGallery()}
              {this.renderGalleryLightBox()}
            </div>
            <div className="house-details-main-information">
              <div id="details"></div>
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
                          <p className="house-details-price-pernight-label">هزینه اقامت هر شب عادی:</p>
                          <div className = "house-details-price">
                            <span> {englishToPersianDigits(parsePrice3digits(this.state.homeData.price))} </span>
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
                      <Scrollchor className="navigation-link" disableHistory={true} animate={{offset: 0, duration: 800}} to="gallery" >
                        <p className='navigation-menu-items'>تصاویر</p>
                      </Scrollchor>
                      <Scrollchor className="navigation-link" disableHistory={true} animate={{offset: 20, duration: 800}} to="details">
                        <p className='navigation-menu-items'>مشخصات</p>
                      </Scrollchor>
                      <Scrollchor className="navigation-link" disableHistory={true} animate={{offset: 260, duration: 800}} to="price">
                        <p className='navigation-menu-items'>قیمت</p>
                      </Scrollchor>
                      <Scrollchor className="navigation-link" disableHistory={true} animate={{offset: -100, duration: 800}} to="laws">
                        <p className='navigation-menu-items'> قوانین و مقررات</p>
                      </Scrollchor>
                      <Scrollchor className="navigation-link" disableHistory={true} animate={{offset: -80, duration: 800}} to="map">
                        <p className='navigation-menu-items'>موقعیت محلی</p>
                      </Scrollchor>
                    </div>
                  </div>
                )}}
              </Sticky>
              <div className="house-details-contents">
                <div className="house-details-amenities-description housedetails-content-containers">
                  <div className="house-details-host-info">
                  <div id="price"></div>
                    <HostInfoDescription homeData={this.state.homeData}/>
                  </div>
                  {
                    (this.state.homeData.description==="")?null :
                    <div>
                      <p className="house-details-description-heading"> درباره این خانه </p>
                      <p className='house-details-description-content house-description-top'> {this.state.homeData.description.replace('-','')} </p>
                    </div>
                  }
                  <div className="house-details-amenities">
                    <p className="house-details-description-heading">
                      امکانات
                    </p>
                    <UtilitiesDescription homeData={this.state.homeData} />
                  </div>

                  <div className="house-details-sleep-arrangements">
                  </div>
                </div>
                <div className="house-details-prices housedetails-content-containers">
                  <p className="house-details-description-heading">
                    هزینه اقامت هر‌شب
                  </p>
                  <DifferentPrices homeData={this.state.homeData}/>
                </div>
                <div id="laws"></div>
                <div className= "house-details-rules housedetails-content-containers">
                  <p className="house-details-description-heading">
                  مقررات این اقامتگاه
                  </p>
                  <CheckInCheckOutDescription homeData={this.state.homeData}/>
                  <MaxCapacity homeData={this.state.homeData}/>
                  <RulesDescription homeData= {this.state.homeData} />
                  <SpecialRule homeData={this.state.homeData}/>
                </div>
                <div id="map"></div>
                <div className="house-details-location housedetails-content-containers">
                  <div className="house-details-location-description">
                  {this.renderRelevantMapDescription()}
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
                    <MapDescription lat={this.state.homeData.latitude} lng={this.state.homeData.longitude} zoom={13}/>
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
    if (this.state.homeData !== '' && this.state.homeData!==null){
      document.title = "تریپین | "  + this.state.homeData.title +  " در " + this.state.homeData.location;
    }
    return(
      <div>
        {this.renderHouseDetailsVersion2()}
      </div>
    );
  }
}

export default HouseDetailsXl;
