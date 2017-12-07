import React from 'react';
class HouseDetails extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      homeData : '',
      token: null,
      searchParams : {
        id: null,
      }
    };
  }
  componentWillMount() {
    this.setState({
      token: "2df579cfc86d929b9a9228bdcd265345addf8cb4",
    }, () => {this.setSearchParams(56)
    });
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
        room_id : this.getHouseId(),
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
      token: "2df579cfc86d929b9a9228bdcd265345addf8cb4",});
  }
  renderData(houseData) {
    // console.log(houseData.room)
    this.setState({homeData:houseData.room});
   }
  render() {
    return(
      <div>
      <div className = "image">
        <img src= {"https://www.trypinn.com" + this.state.homeData.preview}  responsive = "true"  className="SearchResultPreview" alt = "" />
      </div>
        <div className="title">
          <p align="left">{this.state.homeData.title}</p>
        </div>
      <div className="rating">
          <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
      </div>
        <div className = "price">
          <p> {this.state.homeData.price} تومان / هر شب </p>
        </div>
        <div className = "address">
          <p>{this.state.homeData.address} </p>
        </div>
      </div>
    );
  }
}

export default HouseDetails;
