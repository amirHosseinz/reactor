import React from 'react';

class AddressDiscription extends React.Component{
  getRoomType(){
    switch(this.props.homeData.room_type){
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
    switch(this.props.homeData.service_type){
      case "ENTIRE_HOME":
        return 'دربست';
      case "PRIVATE_ROOM":
        return 'اتاق اختصاصی';
      case "SHARED_ROOM":
        return 'اتاق مشترک';
      default :
        return null;
    }
  }
  render(){
    return(
      <div className='row-reverse-house-adress-type'>
        <p>{this.getRoomType()}</p>
        <p>{this.getServiceType()}</p>
        <p>/</p>
        <p>{this.props.homeData.address}</p>
      </div>
    );
  }
}
export default AddressDiscription;
