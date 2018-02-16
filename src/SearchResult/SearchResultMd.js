import React from 'react';

class SearchResultMd extends React.Component{

  // renderHousesCol3 () {
  //   var results = [];
  //   var initList = this.state.houseList.map((houseItem) => {
  //     return(
  //       <div className="pre-img-result col-sm-4"
  //        key = {houseItem.id}>
  //        <SearchResultItem
  //         room = {houseItem}
  //         preview ={"https://www.trypinn.com" + houseItem.preview} />
  //       </div>
  //     );
  //   });
  //   var counter = 0;
  //   var listOfThree = [];
  //   initList.map((item) => {
  //     counter++;
  //     listOfThree.push(item);
  //     if (counter===3) {
  //       counter = 0;
  //       results.push(
  //         <div className="row">
  //         {listOfThree}
  //         </div>
  //       );
  //       listOfThree = [];
  //     }
  //   });
  //   if (listOfThree.length > 0) {
  //     results.push(
  //       <div className="row">
  //       {listOfThree}
  //       </div>
  //     );
  //   }
  //   return results;
  // }



  // <div className="renderresults-main visible-sm">
  //   {this.renderHousesCol3()}
  // </div>
  render(){
    return(
      <div>
      </div>
    );
  }
}

export default SearchResultMd;
