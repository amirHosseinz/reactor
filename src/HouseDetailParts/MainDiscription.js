import React from 'react';
import Facilities from './Facilities.js';
import { englishToPersianDigits } from '../tools/EnglishToPersianDigits';

class MainDiscription extends React.Component{

  renderCheckIn(){
   if(this.props.homeData.check_in_from){
    const checkin=this.props.homeData.check_in_from;
    const checkintill=this.props.homeData.check_in_till;
    const checkin1=checkin.split(":", 2);
    const checkintill1=checkintill.split(":", 2);
    return(
      <div className="check-in">
       ساعت ورود: {englishToPersianDigits(checkin1[0]+":"+checkin1[1]+" تا "+checkintill1[0]+":"+checkintill1[1])}
       </div>
    );
  }
  return null;
}
  renderCheckOut(){
    if(this.props.homeData.check_out){
    const checkout=this.props.homeData.check_out;
    const checkout1=checkout.split(":", 2);
    return(
      <div className="check-out">
       ساعت خروج: {englishToPersianDigits(checkout1[0]+":"+checkout1[1])}
      </div>
    );
  }
  return null;
}
  renderRules(){
    const smoking=this.props.homeData.smoking_allowed;
    const pet=this.props.homeData.pet_allowed;
    const party=this.props.homeData.party_allowed;
    if (smoking===false){
      return(
        <div className="smoking">
          <p>ممنوعیت استعمال دخانیات</p>
        </div>
        )}
    if(party===false){
      return(
        <div className="party">
          <p>ممنوعیت برگزاری جشن </p>
        </div>
      );
    }
    if(pet===false){
      return(
        <div className="pet">
          <p>ممنوعیت ورود حیوان به خانه</p>
          </div>
      );
    }
}
renderUtilities () {
  if (this.props.homeData.private_util_options!= null) {
    const util1=this.props.homeData.private_util_options;
    // const util1list=util1.map((util1)=><div className={util1}><ul key={util1}>{util1}</ul></div>);
    const util2=this.props.homeData.general_util_options;
    // const util2list=util2.map((util2)=><div className={util2}><ul key={util2}>{util2}</ul></div>);
    return(
      <div>
        <Facilities utility={util1}/>
        <Facilities utility={util2}/>
      </div>
    );
  }
}
renderSpecialRules ()
{
  return (
    <div className='special-rules'>
        <p> قوانین خاص این خانه </p>
        <p>{this.props.homeData.special_rules}</p>
    </div>
  );
}
  render(){
    return(
      <div>
        <div className="main-descriptions row">
          <p className='des-header'>سایر امکانات</p>
          <div className="main-descriptions row">
            {this.renderUtilities()}
          </div>
          <div className="divider"></div>

          <p className='des-main'> {this.props.homeData.description}</p>
        </div>
        <div className="main-descriptions row">
          <p className='des-header'>قوانین و مقررات</p>
          {this.renderCheckIn()}
          {this.renderCheckOut()}
          <div className="max-capacity">
            <p>
             حداکثر ظرفیت: {englishToPersianDigits(this.props.homeData.max_capacity)}
            </p>
            {this.renderRules()}
            {this.renderSpecialRules()}
          </div>
        </div>

      </div>
    );
  }
}
export default MainDiscription;
