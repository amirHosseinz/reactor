import React from 'react';
import Facilities from '../Facilities.js';
import Collapsible from 'react-collapsible';
class UtilitiesDescriptionXl extends React.Component{
  constructor(props){
    super(props);
  }

  renderUtilitiesVersion2(){
    const privateUtilities=this.props.homeData.private_util_options;
    const generalUtilities=this.props.homeData.general_util_options;
    var utilities=privateUtilities.concat(generalUtilities);
    var primaryListOfLists = [[],[],[],[],[],[],[],[],[]];
    var listIndex = 0;
    for (var itemIndex=0;itemIndex<utilities.length;itemIndex++){
        if(primaryListOfLists[listIndex].length===3){
          listIndex++;
          primaryListOfLists[listIndex].push(utilities[itemIndex]);
        }
        else{
          primaryListOfLists[listIndex].push(utilities[itemIndex]);
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

export default UtilitiesDescriptionXl;
