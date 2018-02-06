import React from 'react';

class HouseDetailsXs extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showReservePanelXs:false,
    };
  }

  // renderReservePanelXs(){
  //   return(
  //     <Modal show={this.state.showReservePanelXs}
  //            onHide={()=>{this.setState({showReservePanelXs:false})}}>
  //        <ReservePanel homeData = {this.state.homeData}/>
  //     </Modal>
  //   );
  //   }

  // renderHomeTitleXs()
  // {
  //   return (
  //     <p className='house-detail-titles-xs' align="right">{this.state.homeData.title}</p>
  //   );
  // }

 //
 //  renderPreviewXs(){
 //    if(this.state.homeData!==''){
 //        var imagesList = [];
 //        for (var i = 0; i < this.state.homeData.images.length; i++) {
 //         imagesList.push(
 //           "https://www.trypinn.com"+ this.state.homeData.images[i].image
 //         );
 //        }
 //   var sliderList= imagesList.map((image)=>
 //     <img alt="" src={image} />
 //   );
 //
 //   var settings = {
 //     customPaging: (i)=>{
 //         return (<a><Image src={imagesList[i]} circle height="25px" width="25px"/></a>);
 // },
 //     dots: true,
 //     lazyLoad:true,
 //     infinite: true,
 //     fade:true,
 //     dotsClass: 'slick-dots slick-thumb',
 //     speed: 500,
 //     centerMode:true,
 //     slidesToShow:1,
 //     slidesToScroll: 1,
 //   };
 //     return(
 //       <Slider {...settings}>
 //       {sliderList}
 //       </Slider>
 //     );
 //   }
 //  }
  // <div className="housedetail-xs visible-xs hidden-xl">
  //   <div className='housedetail-img-xs'>
  //     {this.renderPreviewXs()}
  //   </div>
  //   <div className="house-detail-top-margined-xs visible-xs hidden-xl">
  //     {this.renderHomeTitleXs()}
  //     <div className='row-reverse-house-adress-type-xs'>
  //       <AddressDescription homeData={this.state.homeData}/>
  //     </div>
  //     <div className='row-reverse-house-adress-type-xs'>
  //       <RatingDescription homeData={this.state.homeData}/>
  //     </div>
  //     <Divider/>
  //      <p className='des-header-xs'> درباره این خانه </p>
  //      <p className='des-main-xs'> {this.state.homeData.description} </p>
  //     <Divider/>
  //     <AmenitiesDescription homeData={this.state.homeData} />
  //     <Divider/>
  //     <p className='des-header-xs'> سایر امکانات </p>
  //     <UtilitiesDescription homeData={this.state.homeData}/>
  //       <Divider/>
  //   </div>
  //
  //   <div className="map-holder-xs">
  //     {this.renderMap()}
  //   </div>
  //
  //   <div className="house-detail-top-margined-xs visible-xs hidden-xl">
  //     <div className="paddingtopundermap"></div>
  //     <Divider/>
  //
  //     <CheckInCheckOutDescription homeData={this.state.homeData}/>
  //
  //     <Divider/>
  //
  //
  //     <p className='des-header-xs'>: قوانین و مقررات </p>
  //     <MaxCapacity homeData={this.state.homeData}/>
  //     <RulesDescription homeData= {this.state.homeData} />
  //   </div>
  //
  //
  //   <div className="house-detail-top-margined-xs visible-xs hidden-xl">
  //       </div>
  //       <div className="reserve-bottom-xs navbar-fixed-bottom">
  //         <div className="price-div-xs hidden-xl visible-xs">
  //           <div className = "price-xs">
  //           <p className="text-017"> هر شب / </p>
  //           <p className='text-018'> تومان</p>
  //           <p className='text-018'> {englishToPersianDigits(this.state.homeData.price)} </p>
  //         </div>
  //       </div>
  //     <Button onClick={()=>{this.setState({showReservePanelXs:true})}}className='reserve-button-xs hidden-xl visible-xs'>
  //       !رزرو کنید
  //     </Button>
  //     {this.renderReservePanelXs()}
  //   </div>
  // </div>
  render(){
    return(
      <div>
      </div>
    );
  }
}

export default HouseDetailsXs;
