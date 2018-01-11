import React from 'react';
import Facilities from './Facilities.js';


class UtilitiesDescription extends React.Component{
  constructor(props){
    super(props);
  }
  renderUtilities(){
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
  render(){
    return(
      <div className="main-descriptions row">
        {this.renderUtilities()}
      </div>
    );
  }
}

export default UtilitiesDescription
