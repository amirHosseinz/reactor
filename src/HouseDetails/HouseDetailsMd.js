import React from 'react';

class HouseDetailsMd extends React.Component{
  // <div className="house-detail-top-margined-md hidden-xl hidden-sm hidden-xs visible-md">
  //   <AddressDescription homeData={this.state.homeData}/>
  //   <div>
  //     {this.renderHomeTitle()}
  //   </div>
  //   <div className='row-reverse-house-adress-type'>
  //     <RatingDescription homeData={this.state.homeData}/>
  //   </div>
  //   <div>
  //   <div>
  //     <div className='navigation-menu-housedetails' style={this.state.scrollListFixed?fixedScrollListHouseDetails:normalScrolllListHouseDetails}>
  //       <p onClick={() => scrollToComponent(this.Dis, { offset: 0, align: 'top', duration: 1500})} className='navigation-menu-items'>مشخصات</p>
  //       <p onClick={() => scrollToComponent(this.Gallery, { offset: 0, align: 'top', duration: 1500})} className='navigation-menu-items' >تصاویر</p>
  //       <p onClick={() => scrollToComponent(this.Laws, { offset: 0, align: 'top', duration: 1500})} className='navigation-menu-items'>امکانات و قوانین</p>
  //       <p onClick={() => scrollToComponent(this.Map, { offset: 0, align: 'top', duration: 1500})} className='navigation-menu-items'>موقعیت روی نقشه</p>
  //     </div>
  //   </div>
  //   <div style={{textAlign:'right'}}>
  //   </div>
  //   </div>
  // </div>






  // <div className="house-detail-top-margined-md hidden-xl hidden-sm hidden-xs visible-md">
  //   <div className="col-md-3 hidden-xs hidden-sm visible-xl">
  //     <Sticky context={this.state.contextRef}
  //     onStick={this.handleStickReservePanel.bind(this)}
  //     onUnstick={this.handleUnstickReservePanel.bind(this)}
  //     style={this.state.reservePanelFixed ? fixedReservePanelHouseDetails:normalReservePanelHouseDetails}>
  //       <div className='reserve-card'>
  //         <div className="reserve-card-child">
  //           <p className="text-011">:هزینه هرشب اقامت</p>
  //           <div className = "price">
  //             <p className='text-012'> تومان</p>
  //             <p className='text-012'> {englishToPersianDigits(this.state.homeData.price)} </p>
  //           </div>
  //           <div className="divider-card"></div>
  //           <p className="text-011">:تعداد مهمان</p>
  //           <div>
  //             {this.renderReservePanel()}
  //           </div>
  //       </div>
  //       </div>
  //     </Sticky>
  //   </div>
  //   <div className='col-md-9'>
  //    <section className='gallery-scroller' ref={(section) => {this.Gallery = section;}}></section>
  //     <div className='housedetail-img'>
  //       {this.renderPreview()}
  //       {this.renderHouseGallery()}
  //     </div>
  //     <section className='violet' ref={(section) => { this.Violet = section; }}></section>
  //     <AmenitiesDescription homeData={this.state.homeData} />
  //     <br/>
  //     <Divider/>
  //     <div>
  //       <HostInfoDescription homeData={this.state.homeData}/>
  //       <p className='des-main-xs'> {this.state.homeData.description} </p>
  //     </div>
  //     <Divider/>
  //     <section className='law-scroller' ref={(section) => { this.Laws = section; }}></section>
  //     <p className='des-header-xl'> سایر امکانات </p>
  //     <UtilitiesDescription homeData={this.state.homeData}/>
  //     <Divider/>
  //     <p className='des-header-xl'> قوانین و مقررات </p>
  //       <div>
  //         <div className="rules-half col-md-6">
  //         <RulesDescription homeData= {this.state.homeData} />
  //         </div>
  //         <div className="rules-half col-md-6">
  //         <CheckInCheckOutDescription homeData={this.state.homeData}/>
  //         <MaxCapacity homeData={this.state.homeData}/>
  //         </div>
  //       </div>
  //       <SpecialRule homeData={this.state.homeData}/>
  //     <section className='map-scroller' ref={(section) => { this.Map = section; }}></section>
  //     <div className="padding10">
  //     </div>
  //       {this.renderMap()}
  //     <div className="padding100">
  //     </div>
  //   </div>
  // </div>
  render(){
    // if (this.state.homeData !== ''){
    //   document.title = "تریپین | "  + this.state.homeData.title +  " در " + this.state.homeData.city;
    // }
    return(
      <div>
      </div>
    );
  }
}

export default HouseDetailsMd;
