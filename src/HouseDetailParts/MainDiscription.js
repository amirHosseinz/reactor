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
                   <div className="divider-card"></div>
      </div>
    );
  }
  return null;
}
  renderSmoking(){
    const smoking=this.props.homeData.smoking_allowed;
    if (smoking===false){
      return(
        <div className="public-rules-div">
          <img src={require('./rules/cigarette.png')}   className="other-amanities-icon" alt = "" />
          <p className="facility-text">ممنوعیت استعمال دخانیات </p>
        </div>
      );
    }
  }


renderPet(){
  const pet=this.props.homeData.pet_allowed;
  if(pet===false){
    return(
      <div className="public-rules-div">
        <img src={require('./rules/dog.png')}   className="other-amanities-icon" alt = "" />
        <p className="facility-text">ممنوعیت ورود حیوان به خانه</p>
        </div>
    );
  }
}


renderParty(){
  const party=this.props.homeData.party_allowed;
  if(party===false){
    return(
      <div className="public-rules-div">
      <img src={require('./rules/singles.png')}   className="other-amanities-icon" alt = "" />
        <p className="facility-text">ممنوعیت برگزاری جشن </p>
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
    var utilities=util1.concat(util2);;
    var list1=[];
    var list2=[];
    var index=[list1,list2];
    var counter = 0;
    var i;
    var length= utilities.length;
    var halflength=Math.floor(length/2);
    for (i = 0; i < halflength;) {
      if (counter===0){
        counter=0
        index[counter]+= utilities[i],
        i+=1
      }
     }
     counter=1;
     for (i =halflength; i <length;) {
       if (counter===1){
         counter=1
         index[counter]+= utilities[i],
         i+=1
       }
      }

    if(index[0].length>index[1].length){
      return(
        <div>
        <div className='col-md-6'>
          <Facilities utility={index[0]}/>
          </div>
        <div className='col-md-6'>
          <Facilities utility={index[1]}/>
          </div>
          </div>
        );
}
   else {
     return(
       <div>
       <div className='col-md-6'>
         <Facilities utility={index[1]}/>
         </div>
       <div className='col-md-6'>
         <Facilities utility={index[0]}/>
       </div>
       </div>
     );
   }
    }
  }

renderSpecialRules (){
  if(this.props.homeData.special_rules!==''){
    return (
      <div className='special-rules'>
          <p> :قوانین خاص این خانه </p>
          <p>{this.props.homeData.special_rules}</p>
      </div>
    );
  }
}
  render(){
    return(
      <div>
        <div className="main-descriptions row">
          <p className='des-header'>سایر امکانات</p>
          <div className="main-descriptions row">
            {this.renderUtilities()}
          </div>
          <div className="divider">

          </div>
        </div>
        <div className="main-descriptions row">
        <div>
          {this.renderCheckIn()}
          {this.renderCheckOut()}
        </div>
        <div className="max-capacity">
        <p>
         حداکثر ظرفیت: {englishToPersianDigits(this.props.homeData.max_capacity)}
        </p>
        </div>
        <div className="divider"></div>
          <p className='des-header'>قوانین و مقررات</p>
          <div className="rules">
          {this.renderParty()}
          {this.renderPet()}
          {this.renderSmoking()}
         </div>
         <div>
            {this.renderSpecialRules()}
          </div>
        </div>

      </div>
    );
  }
}
export default MainDiscription;
