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
import DifferentPrices from '../HouseDetailParts/DifferentPrices.js';
import RulesDescription from '../HouseDetailParts/RulesDescription.js';
import SpecialRule from  '../HouseDetailParts/SpecialRule.js';
import GuestNumber from '../HouseDetailParts/GuestNumber';
import {parsePrice3digits} from '../tools/ParsePrice3digits.js';
import Scrollchor from 'react-scrollchor';
import './HouseDetails.css';
import Lightbox from 'react-images';
import MetaTags from 'react-meta-tags';
import {Link} from 'react-router-dom';


class HouseDetailsMd extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      className:'loaded',
      photoIndex: 0,
      isOpen: false,
      activeLink:1,
      homeData : '',
      isLiked: false,
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

  componentDidMount() {
    window.addEventListener("scroll", (event)=>{this.handleScroll(event)});
  }

  handleScroll(event) {
    if(window.scrollY<400){
      this.setState({activeLink:1});
    }
    if(window.scrollY > 400 && window.scrollY<850){
      this.setState({activeLink:2});
    }
    if(window.scrollY > 850 && window.scrollY<1050){
      this.setState({activeLink:3});
    }
    if(window.scrollY > 1050 && window.scrollY<1450){
      this.setState({activeLink:4});
    }
    if(window.scrollY > 1450){
      this.setState({activeLink:5});
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
       return;
      }
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
        <img src={"https://www.trypinn.com"+image.image} className="house-details-preview-md" alt = {image.title==="Room Picture"?"" :image.title}/>
     )}
   );
   if(this.state.homeData!==''){
     return(
          <div onClick={()=>{this.setState({lightboxIsOpen:true})}} className="house-details-gallery-md">

            <img src={"https://www.trypinn.com"+ this.state.homeData.preview_high} className="house-details-preview-md" alt = {this.state.homeData.title}/>
            <div className="row-reverse">
              {imageList}
            </div>
            <div onClick={()=>{this.setState({lightboxIsOpen:true})}} className="house-details-gallery-show-more-md">
            مشاهده تصاویر
            </div>
          </div>
     );
   }
 }



 renderGalleryLightBox(){
   var images = [];
   images.push({src:"https://www.trypinn.com" + this.state.homeData.preview_high});
   for (var imageIndex=this.state.homeData.images.length-1;imageIndex>=0;imageIndex--){
     images.push({src: "https://www.trypinn.com"+ this.state.homeData.images[imageIndex].image});
   }
   var imagesLength = images.length;
   return(
     <Lightbox
    images={images}
    currentImage={this.state.lightboxCurrentImage}
    isOpen={this.state.lightboxIsOpen}
    onClickPrev={()=>{this.setState((prevState)=>{return({lightboxCurrentImage:(prevState.lightboxCurrentImage-1)%imagesLength})})}}
    showImageCount={false}
    showThumbnails={true}
    onClickThumbnail={(currentImageIndex)=>{this.setState({lightboxCurrentImage:currentImageIndex})}}
    onClickNext={()=>{this.setState((prevState)=>{return({lightboxCurrentImage:(prevState.lightboxCurrentImage+1)%imagesLength})})}}
    onClose={()=>{this.setState({lightboxIsOpen:false,lightboxCurrentImage:0})}}
/>
   );
 }

 renderTourismPlaces(){
   if(this.state.homeData.tourism_attractions.length>0)
   return(
     <div>
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

 handleLike(){
   if(localStorage['isLoggedIn']==="false") {
    this.props.enableTriggerLogin();
    return;
   }
   this.setState((prevState,props)=>({isLiked:!prevState.isLiked}));
   switch(window.location.href.split("/")[window.location.href.split("/").length-2]){
     case 'rooms' : {
       var request = new Request('https://www.trypinn.com/bookmark/api/like/', {
         method: 'POST',
         body: JSON.stringify({
           room_id : this.state.homeData.id,
       }),
         headers: new Headers({'Accept':'application/json','Content-Type': 'application/json',
         'Authorization':'Token '+this.state.token,})
       });
      fetch(request)
      .then((response) => {
        return response.json();
      })
      .then((likeResponse) => {
        if(likeResponse.successful===true){
        }
      });
       break;
     }
     case 'ecotourism':{
       var request = new Request('https://www.trypinn.com/bookmark/api/like/', {
         method: 'POST',
         body: JSON.stringify({
           eco_room_id : this.state.homeData.id,
       }),
         headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
         'Authorization': 'Token '+this.state.token,})
       });
      fetch(request)
      .then((response) => {
        return response.json();
      })
      .then((likeResponse) => {
        if(likeResponse.successful===true){
        }
      });
       break;
     }
   }
 }

 handleUnlike(){
   this.setState((prevState,props)=>({isLiked:!prevState.isLiked}));
   switch(window.location.href.split("/")[window.location.href.split("/").length-2]){
     case 'rooms':{
       var request = new Request('https://www.trypinn.com/bookmark/api/unlike/', {
         method: 'POST',
         body: JSON.stringify({
           room_id : this.state.homeData.id,
       }),
         headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
         'Authorization': 'Token '+this.state.token,})
       });
      fetch(request)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((unlikeResponse) => {
        if(unlikeResponse.successful===true){
          // this.setState((prevState,props)=>({isLiked:!prevState.isLiked}));
        }
      });
       break;
     }
     case 'ecotourism':{
       var request = new Request('https://www.trypinn.com/bookmark/api/unlike/', {
         method: 'POST',
         body: JSON.stringify({
           eco_room_id : this.state.homeData.id,
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
 renderAddressBreadCrumbList(){
   var position = this.state.homeData.location_hierarchy.length + 1;
   var breadCrumbList = this.state.homeData.location_hierarchy.map((item)=>{
     position = position - 1;
     return(
       <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem" className="address-bread-crumb-list-item">
        <Link itemProp="item" className="address-bread-crumb-list-link" to={"/search/" + item}>
          <div itemProp="name" className="address-bread-crumb-list-item-name">
            {item}
          </div>
        </Link>
        <meta itemProp="position" content={position} />
         {item!==this.state.homeData.location_hierarchy[this.state.homeData.location_hierarchy.length-1]?<div className="address-bread-crumb-list-left-arrow"></div>:<div></div>}
       </li>
     )
   });
   return (
     <ol itemScope={true} itemType={"http://schema.org/BreadcrumbList"} className="address-bread-crumb-list">
      {breadCrumbList}
     </ol>
   );
 }

  renderHouseDetailsVersion2(){
    if(this.state.homeData!=='' && this.state.homeData!==null){
      return(
        <div className="house-details-main-division">
          <div className="house-details-top-division-md">
            <div id="gallery-md"></div>
            <div className="house-details-gallery-md">
              {this.renderGallery()}
              {this.renderGalleryLightBox()}
            </div>
            <div className="house-details-main-information-md">
              {this.renderAddressBreadCrumbList()}
              {this.renderHomeTitle()}
              <div id="details-md"></div>
              <AddressDescription homeData={this.state.homeData}/>
              <AmenitiesDescription homeData={this.state.homeData} />
            </div>
          </div>
          <div className="house-details-bottom-division-md">
            <Sticky topOffset={550} bottomOffset={210}>
              {({style,isSticky})=>{
                return(
                  <div style={style}>
                    <div className={isSticky?"house-details-reserve-panel-sticky-md housedetails-content-containers-md":"house-details-reserve-panel-not-sticky-md housedetails-content-containers-md"}>
                      <div className="house-details-reserve-panel-price-description">
                        <div>
                          <p className="house-details-price-pernight-label-md"> هزینه اقامت هر شب عادی:</p>
                          <p className="house-details-price-pernight-ecotourism">{this.state.homeData.is_price_per_person===false?"" :  "( به ازای هر نفر )" }</p>
                        </div>
                          <div className = "house-details-price">
                            <span> {englishToPersianDigits(parsePrice3digits(this.state.homeData.price))} </span>
                            <span> تومان</span>
                          </div>
                      </div>
                      <hr />
                      <div className="house-details-reserve-panel-form">
                        <ReservePanel setTriggerLoginOrigin={(origin)=>{this.props.setTriggerLoginOrigin(origin)}} enableTriggerLogin={this.props.enableTriggerLogin.bind(this)} homeData={this.state.homeData}/>
                      </div>
                    </div>
                    <div className={isSticky?"bookmark-share-container-sticky-md":"bookmark-share-container-not-sticky-md"}>
                      <div className="bookmark-section">
                        <img className="bookmark-icon" onClick={this.state.isLiked?()=>{this.handleUnlike()}:()=>{this.handleLike()}} src={this.state.isLiked?require('../HouseDetailParts/facilities/Layer 5.png'):require('../HouseDetailParts/facilities/heart-2d56.png')}/>
                        <p onClick={this.state.isLiked?()=>{this.handleUnlike()}:()=>{this.handleLike()}} className="bookmark-sentence">{!this.state.isLiked?"افزودن به لیست علاقه‌مندی":"حذف از لیست علاقه‌مندی"}</p>
                      </div>
                      <div className="bookmark-vertical-line">
                      </div>
                      <div className="share-section">
                      <div className="share-icon-container-telegram">
                        <a className="share-link" href={"https://telegram.me/share/url?url=http://www.tripinn.ir/"+window.location.href.split("/")[window.location.href.split("/").length-2]+"/"+this.state.homeData.id  +"&text="+this.state.homeData.title}>
                          <img width="24px" className="share-icon" src={require('../HouseDetailParts/facilities/tripinn_telegram_share.png')} alt="به اشتراک گذاشتن در تلگرام"/>
                        </a>
                      </div>
                      <div className="share-icon-container-google-plus">
                        <a className="share-link" href={"https://plus.google.com/share?url=http://www.tripinn.ir/"+ window.location.href.split("/")[window.location.href.split("/").length-2] +"/" + this.state.homeData.id}>
                          <img width="24px" className="share-icon" src={require('../HouseDetailParts/facilities/tripinn_google_puls_share.png')} alt="به اشتراک گذاشتن در گوگل‌پلاس"/>
                        </a>
                      </div>
                      <div className="share-icon-container-twitter">
                        <a className="share-link" href={"https://twitter.com/intent/tweet?url=http://www.tripinn.ir/"+window.location.href.split("/")[window.location.href.split("/").length-2] +"/" + this.state.homeData.id}>
                          <img width="24px" className="share-icon" src={require('../HouseDetailParts/facilities/tripinn_twitter_share.png')} alt="به اشتراک گذاشتن در توییتر"/>
                        </a>
                      </div>
                      </div>
                    </div>
                  </div>
                )
              }}
            </Sticky>
            <div>
              <Sticky topOffset={540}>
                {({style,isSticky})=>{return(
                  <div style={style} className={isSticky?"house-details-menu-link-scrolls-sticky-md":"house-details-menu-link-scrolls-not-sticky-md housedetails-content-containers-menu-md"}>
                    <div className='navigation-menu-housedetails'>
                      <Scrollchor className="navigation-link" disableHistory={true} animate={{offset: 0, duration: 400}} to="gallery-md">
                        <p onClick={()=>{this.setState({activeLink:1})}} className={(this.state.activeLink===1)?"navigation-menu-items-active":'navigation-menu-items'}>تصاویر</p>
                      </Scrollchor>
                      <Scrollchor className="navigation-link" disableHistory={true} animate={{offset: -24, duration: 400}} to="details-md">
                        <p onClick={()=>{this.setState({activeLink:2})}} className={(this.state.activeLink===2)?"navigation-menu-items-active":'navigation-menu-items'}>مشخصات</p>
                      </Scrollchor>
                      <Scrollchor className="navigation-link" disableHistory={true} animate={{offset: -90 , duration: 400}} to="price-md">
                        <p onClick={()=>{this.setState({activeLink:3})}} className={(this.state.activeLink===3)?"navigation-menu-items-active":'navigation-menu-items'}>قیمت</p>
                      </Scrollchor>
                      <Scrollchor className="navigation-link" disableHistory={true} animate={{offset: -150, duration: 400}} to="laws-md">
                        <p onClick={()=>{this.setState({activeLink:4})}} className={(this.state.activeLink===4)?"navigation-menu-items-active":'navigation-menu-items'}>قوانین و مقررات  </p>
                      </Scrollchor>
                      <Scrollchor className="navigation-link" disableHistory={true} animate={{offset:-80, duration: 400}} to="map-md">
                        <p onClick={()=>{this.setState({activeLink:5})}} className={(this.state.activeLink===5)?"navigation-menu-items-active":'navigation-menu-items'}>موقعیت محلی</p>
                      </Scrollchor>
                    </div>
                  </div>
                )}}
              </Sticky>
              <div className="house-details-contents-md">
                <div className="house-details-amenities-description housedetails-content-containers">
                  <div className="house-details-host-info">
                    <HostInfoDescription homeData={this.state.homeData}/>
                  </div >
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
                    <div>

                    </div>
                    <UtilitiesDescription homeData={this.state.homeData} />
                  </div>
                  <div className="house-details-sleep-arrangements">
                  </div>
                </div>
                <div id="price-md"></div>
                <div className="house-details-prices housedetails-content-containers">
                  <p className="house-details-description-heading">
                    هزینه اقامت هر‌شب
                  </p>
                  <DifferentPrices homeData={this.state.homeData}/>
                </div>
                <div className= "house-details-rules housedetails-content-containers">
                  <div id="laws-md"></div>
                  <p className="house-details-description-heading">
                  مقررات این اقامتگاه
                  </p>
                  <CheckInCheckOutDescription homeData={this.state.homeData}/>
                  <MaxCapacity homeData={this.state.homeData}/>
                  <RulesDescription homeData= {this.state.homeData} />
                  <SpecialRule homeData={this.state.homeData}/>
                </div>
                <div id="map-md"></div>
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

  renderTitle(){
    if (this.state.homeData===null || this.state.homeData===''){
      return "";
    }
    else{
      if(this.state.homeData.page_title===null){
        return this.state.homeData.title +  " در " + this.state.homeData.location + ' | ' + "تریپین";
      }
      else{
        return this.state.homeData.page_title + " | " + "تریپین";
      }
    }
  }

  render(){
    <MetaTags>
      <title>{this.renderTitle()}</title>
      <meta name="description" content={this.state.homeData.title + " آدرس :  " + this.state.homeData.location + " ,قیمت :" + this.state.homeData.price  + " ,امتیاز : " + this.state.homeData.rating} />
      <meta property="og:image" content={"https://www.trypinn.com" + this.state.homeData.preview_high}/>
    </MetaTags>
    return(
      <div>
        {this.renderHouseDetailsVersion2()}
      </div>
    );
  }
}
export default HouseDetailsMd;
