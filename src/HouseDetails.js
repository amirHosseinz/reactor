import React from 'react';
import Lightbox from 'react-image-lightbox';
import scrollToComponent from 'react-scroll-to-component';
import {Sticky,Divider} from 'semantic-ui-react';
import {Button,Carousel,Image} from 'react-bootstrap';
import ReservePanel from './HouseDetailParts/ReservePanel.js';
import AddressDescription from './HouseDetailParts/AddressDescription';
import AmenitiesDescription from './HouseDetailParts/AmenitiesDescription';
import RatingDescription from './HouseDetailParts/RatingDescription';
import HostInfoDescription from './HouseDetailParts/HostInfoDescription.js';
import {englishToPersianDigits} from './tools/EnglishToPersianDigits.js';
import {normalReservePanelHouseDetails, fixedReservePanelHouseDetails,normalScrolllListHouseDetails , fixedScrollListHouseDetails} from './Styles.js';
import AspectRatio from 'react-aspect-ratio';
// import GoogleApiWrapper from './HouseDetailParts/MapRenderer.js';
import MapDescription from './HouseDetailParts/MapRenderer.js';
import {Modal} from 'react-bootstrap';
import UtilitiesDescription from './HouseDetailParts/UtilitiesDescription.js';
import CheckInCheckOutDescription from './HouseDetailParts/CheckInCheckOutDescription.js';
import MaxCapacity from './HouseDetailParts/MaxCapacity.js';
import RulesDescription from './HouseDetailParts/RulesDescription.js';
import SpecialRule from  './HouseDetailParts/SpecialRule.js';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GuestNumber from './HouseDetailParts/GuestNumber';

class HouseDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      className:'loaded',
      imageLoaded:false,
      photoIndex: 0,
      isOpen: false,
      homeData : '',
      contextRef: '',
      reservePanelFixed : false,
      scrollListFixed:false,
      showReservePanel : true,
      showReservePanelXs:false,
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
   renderReservePanelXs(){
     return(
       <Modal show={this.state.showReservePanelXs}
              onHide={()=>{this.setState({showReservePanelXs:false})}}>
          <ReservePanel homeData = {this.state.homeData}/>
       </Modal>
     );
     }
   renderHomeTitle()
   {
     return (
       <p className='house-detail-titles' align="right">{this.state.homeData.title}</p>
     );
   }
   renderHomeTitleXs()
   {
     return (
       <p className='house-detail-titles-xs' align="right">{this.state.homeData.title}</p>
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


 renderPreviewXs(){
   if(this.state.homeData!==''){
       var imagesList = [];
       for (var i = 0; i < this.state.homeData.images.length; i++) {
        imagesList.push(
          "https://www.trypinn.com"+ this.state.homeData.images[i].image
        );
       }
  var sliderList= imagesList.map((image)=>
    <img alt="" src={image} />
  );

  var settings = {
    customPaging: (i)=>{
        return (<a><Image src={imagesList[i]} circle height="25px" width="25px"/></a>);
},
    dots: true,
    lazyLoad:true,
    infinite: true,
    fade:true,
    dotsClass: 'slick-dots slick-thumb',
    speed: 500,
    centerMode:true,
    slidesToShow:1,
    slidesToScroll: 1,
  };
    return(
      <Slider {...settings}>
      {sliderList}
      </Slider>
    );
  }
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

  handleContextRef = (contextReference) => {
    this.setState({ contextRef : contextReference});
  }

  handleStickReservePanel(){
    this.setState({reservePanelFixed:true});
  }
  handleUnstickReservePanel(){
    this.setState({reservePanelFixed:false});
  }
  handleStickScrollList(){
    this.setState({scrollListFixed:true});
  }
  handleUnstickScrollList(){
    this.setState({scrollListFixed:false});
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
    if(true){
      return(
        <div className={this.state.imageLoaded?"house-detail-image-loaded":"house-detail-image-not-loaded"}>
          <div className='housedetail container-fluid visible-xl hidden-xs' ref={this.handleContextRef}>
            <div className="house-detail-top">
              <div className="house-detail-top-margined visible-xl hidden-md hidden-sm hidden-xs">
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
                  <div className='navigation-menu-housedetails' style={this.state.scrollListFixed?fixedScrollListHouseDetails:normalScrolllListHouseDetails}>
                    <p onClick={() => scrollToComponent(this.Dis,{offset: 0, align: 'top', duration: 1500})} className='navigation-menu-items'>مشخصات</p>
                    <p onClick={() => scrollToComponent(this.Gallery, { offset: 0, align: 'top', duration: 1500})} className='navigation-menu-items' >تصاویر</p>
                    <p onClick={() => scrollToComponent(this.Laws, { offset: 0, align: 'top', duration: 1500})} className='navigation-menu-items'>امکانات و قوانین</p>
                    <p onClick={() => scrollToComponent(this.Map, { offset: 0, align: 'top', duration: 1500})} className='navigation-menu-items'>موقعیت روی نقشه</p>
                  </div>
                </div>
                <div style={{textAlign:'right'}}>
                </div>
                </div>
              </div>
              <div className="house-detail-top-margined-md hidden-xl hidden-sm hidden-xs visible-md">
                <AddressDescription homeData={this.state.homeData}/>
                <div>
                  {this.renderHomeTitle()}
                </div>
                <div className='row-reverse-house-adress-type'>
                  <RatingDescription homeData={this.state.homeData}/>
                </div>
                <div>
                <div>
                  <div className='navigation-menu-housedetails' style={this.state.scrollListFixed?fixedScrollListHouseDetails:normalScrolllListHouseDetails}>
                    <p onClick={() => scrollToComponent(this.Dis, { offset: 0, align: 'top', duration: 1500})} className='navigation-menu-items'>مشخصات</p>
                    <p onClick={() => scrollToComponent(this.Gallery, { offset: 0, align: 'top', duration: 1500})} className='navigation-menu-items' >تصاویر</p>
                    <p onClick={() => scrollToComponent(this.Laws, { offset: 0, align: 'top', duration: 1500})} className='navigation-menu-items'>امکانات و قوانین</p>
                    <p onClick={() => scrollToComponent(this.Map, { offset: 0, align: 'top', duration: 1500})} className='navigation-menu-items'>موقعیت روی نقشه</p>
                  </div>
                </div>
                <div style={{textAlign:'right'}}>
                </div>
                </div>
              </div>
            </div>
            <div className='house-detail-top'>
              <div className="house-detail-top-margined hidden-md hidden-sm hidden-xs">
                  <div className="col-md-3 hidden-xs hidden-sm visible-xl">
                    <Sticky context={this.state.contextRef}
                    onStick={this.handleStickReservePanel.bind(this)}
                    onUnstick={this.handleUnstickReservePanel.bind(this)}
                    style={this.state.reservePanelFixed ? fixedReservePanelHouseDetails:normalReservePanelHouseDetails}>
                      <div className='reserve-card'>
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
                    </Sticky>
                  </div>
                  <div className='col-md-9'>
                   <section className='gallery-scroller' ref={(section) => {this.Gallery = section;}}></section>
                    <div className='housedetail-img'>
                      {this.renderPreview()}
                      {this.renderHouseGallery()}

                    </div>
                    <section className='violet' ref={(section) => { this.Violet = section; }}></section>
                    <AmenitiesDescription homeData={this.state.homeData} />
                    <br/>
                    <Divider/>
                    <div>
                      <HostInfoDescription homeData={this.state.homeData}/>
                      <p className='des-main-xs'> {this.state.homeData.description} </p>
                    </div>
                    <Divider/>
                    <section className='law-scroller' ref={(section) => { this.Laws = section; }}></section>
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


                    <section className='map-scroller' ref={(section) => { this.Map = section; }}></section>


                    <div className="padding10">
                    </div>
                      {this.renderMap()}
                    <div className="padding100">
                    </div>
                  </div>
              </div>
              <div className="house-detail-top-margined-md hidden-xl hidden-sm hidden-xs visible-md">
                <div className="col-md-3 hidden-xs hidden-sm visible-xl">
                  <Sticky context={this.state.contextRef}
                  onStick={this.handleStickReservePanel.bind(this)}
                  onUnstick={this.handleUnstickReservePanel.bind(this)}
                  style={this.state.reservePanelFixed ? fixedReservePanelHouseDetails:normalReservePanelHouseDetails}>
                    <div className='reserve-card'>
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
                  </Sticky>
                </div>
                <div className='col-md-9'>
                 <section className='gallery-scroller' ref={(section) => {this.Gallery = section;}}></section>
                  <div className='housedetail-img'>
                    {this.renderPreview()}
                    {this.renderHouseGallery()}
                  </div>
                  <section className='violet' ref={(section) => { this.Violet = section; }}></section>
                  <AmenitiesDescription homeData={this.state.homeData} />
                  <br/>
                  <Divider/>
                  <div>
                    <HostInfoDescription homeData={this.state.homeData}/>
                    <p className='des-main-xs'> {this.state.homeData.description} </p>

                  </div>

                  <Divider/>

                  <section className='law-scroller' ref={(section) => { this.Laws = section; }}></section>


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


                  <section className='map-scroller' ref={(section) => { this.Map = section; }}></section>

                  <div className="padding10">
                  </div>
                    {this.renderMap()}
                  <div className="padding100">
                  </div>

                </div>
              </div>

              </div>
            </div>

          <div className="housedetail-xs visible-xs hidden-xl">
            <div className='housedetail-img-xs'>
              {this.renderPreviewXs()}
            </div>
            <div className="house-detail-top-margined-xs visible-xs hidden-xl">
              {this.renderHomeTitleXs()}
              <div className='row-reverse-house-adress-type-xs'>
                <AddressDescription homeData={this.state.homeData}/>
              </div>
              <div className='row-reverse-house-adress-type-xs'>
                <RatingDescription homeData={this.state.homeData}/>
              </div>
              <Divider/>
               <p className='des-header-xs'> درباره این خانه </p>
               <p className='des-main-xs'> {this.state.homeData.description} </p>
              <Divider/>
              <AmenitiesDescription homeData={this.state.homeData} />
              <Divider/>
              <p className='des-header-xs'> سایر امکانات </p>
              <UtilitiesDescription homeData={this.state.homeData}/>
                <Divider/>
            </div>

            <div className="map-holder-xs">
              {this.renderMap()}
            </div>

            <div className="house-detail-top-margined-xs visible-xs hidden-xl">
              <div className="paddingtopundermap"></div>
              <Divider/>

              <CheckInCheckOutDescription homeData={this.state.homeData}/>

              <Divider/>


              <p className='des-header-xs'>: قوانین و مقررات </p>
              <MaxCapacity homeData={this.state.homeData}/>

              <RulesDescription homeData= {this.state.homeData} />
            </div>


            <div className="house-detail-top-margined-xs visible-xs hidden-xl">
                </div>
                <div className="reserve-bottom-xs navbar-fixed-bottom">
                  <div className="price-div-xs hidden-xl visible-xs">
                    <div className = "price-xs">
                    <p className="text-017"> هر شب / </p>
                    <p className='text-018'> تومان</p>
                    <p className='text-018'> {englishToPersianDigits(this.state.homeData.price)} </p>
                  </div>
                </div>
              <Button onClick={()=>{this.setState({showReservePanelXs:true})}}className='reserve-button-xs hidden-xl visible-xs'>
                !رزرو کنید
              </Button>
              {this.renderReservePanelXs()}
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

        {this.renderHouseDetails()}
      </div>
    );
}
}
export default HouseDetails;
