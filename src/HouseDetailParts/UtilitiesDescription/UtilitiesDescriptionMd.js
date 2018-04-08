import React from 'react';
import Facilities from '../Facilities.js';
import Collapsible from 'react-collapsible';
class UtilitiesDescriptionMd extends React.Component{
  constructor(props){
    super(props);
  }

  renderUtilitiesVersion2(){
    switch(window.location.href.split("/")[window.location.href.split("/").length-2]){
      case 'rooms':{
        const privateUtilities=this.props.homeData.private_util_options;
        const generalUtilities=this.props.homeData.general_util_options;
        var utilities=privateUtilities.concat(generalUtilities);
        break;
      }
      case 'ecotourism':{
        const generalUtilities=this.props.homeData.general_utils_options;
        var utilities = this.props.homeData.general_utils_options;
        break;
      }
    }

    var subUtilities=[];
    for (var itemCounter=utilities.length-1;itemCounter>=0;itemCounter--){
      if(["COOKING_UTILS",'PERGOLA','KITCHEN','SHORE_SIDE','PRIVATE_LOCK','BED','MATTRESS'].indexOf(utilities[itemCounter])===-1){
        subUtilities.push(utilities[itemCounter]);
      }
    }
    if(this.props.homeData.toilets_number>0){
      subUtilities.push("ENTIRE_TOILET");
    }
    var primaryListOfLists = [[],[],[],[],[],[],[],[],[]];
    var listIndex = 0;
    for (var itemIndex=0;itemIndex<subUtilities.length;itemIndex++){
        if(primaryListOfLists[listIndex].length===3){
          listIndex++;
          primaryListOfLists[listIndex].push(subUtilities[itemIndex]);
        }
        else{
          primaryListOfLists[listIndex].push(subUtilities[itemIndex]);
        }
    }
    var secondaryListOfLists = [];
    for(listIndex=0;listIndex<primaryListOfLists.length;listIndex++){
      if(primaryListOfLists[listIndex].length!==0){
        secondaryListOfLists.push(primaryListOfLists[listIndex]);
      }
    }
    var listOfUtilitiesString=[];
    for (var listIndex=0 ; listIndex<secondaryListOfLists.length;listIndex++){
      var string="";
      for (var i=0;i<secondaryListOfLists[listIndex].length;i++){
        string += (secondaryListOfLists[listIndex][i]);
      }
      listOfUtilitiesString.push(string);
    }
    var listOfUtilitiesStringFirstRow = listOfUtilitiesString[0];
    listOfUtilitiesString.splice(0,1);
    var listOfUtilitiesStringSecondRow = listOfUtilitiesString;

    return(
      <div>
        <div className="housedetails-utilities-container">
          <Facilities utility={listOfUtilitiesStringFirstRow}/>
        </div>
        <Collapsible
        trigger={<div className="house-details-utilities-see-more-items">نمایش تمام امکانات </div>}
        triggerWhenOpen=""
        lazyRender={true}
        easing='steps(1,end);'>
          {listOfUtilitiesStringSecondRow.map(
            (utility)=>{
              return(
                  <div>
                    <Facilities utility={utility}/>
                  </div>
              );
            }
          )}
        </Collapsible>
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.renderUtilitiesVersion2()}
      </div>
    );
  }
}

export default UtilitiesDescriptionMd;
