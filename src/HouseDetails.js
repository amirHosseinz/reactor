import React from 'react';

import { Icon,Button} from 'semantic-ui-react';
import Lightbox from 'react-image-lightbox';
import ReservePanel from './HouseDetailParts/ReservePanel.js';
import MainDiscription from './HouseDetailParts/MainDiscription';
import AddressDiscription from './HouseDetailParts/AddressDiscription';
import AmenitiesDiscription from './HouseDetailParts/AmenitiesDiscription';
import MapDiscription from './HouseDetailParts/MapDiscription';
import RatingDiscription from './HouseDetailParts/RatingDiscription';
import ScrollPanel from './HouseDetailParts/ScrollPanel';
import HostInfoDiscription from './HouseDetailParts/HostInfoDiscription';

class HouseDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      photoIndex: 0,
      isOpen: false,
      homeData : '',
      showReservePanel : false,
      token: null,
      searchParams : {
        id: null,
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    this.setState({
      token: "2df579cfc86d929b9a9228bdcd265345addf8cb4",
    }, () => {
      this.setSearchParams(this.getHouseId());
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
        room_id : this.state.searchParams.id,
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
    this.setState({homeData:houseData.room});
  }

   handleClick(){
     this.setState({showReservePanel : true});
   }

   renderReservePanel(){
     if (this.state.showReservePanel === true){
       return <ReservePanel homeData = {this.state.homeData}/>
     }
   }
   renderHomeTitle()
   {
     return (
       <p className='house-detail-titles'align="right">{this.state.homeData.title}</p>
     );
   }

 showHouseGallery(){
   this.setState({isOpen: true});
 }
 renderPreview(){
   if(this.state.homeData!==''){
     return(<div className = "housedetail-img">
             <img
             src= {"https://www.trypinn.com" + this.state.homeData.preview}  className="house-details-preview"
             alt = ""
             onClick = {this.showHouseGallery.bind(this)}/>
             </div>);
   }
 }
 renderHouseGallery(){
   if (this.state.homeData !==''){
     var imageList = [];
     for (var i = 0; i < this.state.homeData.images.length; i++) {
      imageList.push(
        "https://www.trypinn.com"+ this.state.homeData.images[i].image
      );
     }
     const photoIndex= this.state.photoIndex;
     const isOpen = this.state.isOpen;
     return (
       <div>
       {isOpen && (
         <Lightbox
           mainSrc={imageList[photoIndex]}
           nextSrc={imageList[(photoIndex + 1) % imageList.length]}
           prevSrc={imageList[(photoIndex + imageList.length - 1) % imageList.length]}
           mainSrcThumbnail={imageList[photoIndex]}
           nextSrcThumbnail={imageList[(photoIndex + 1) % imageList.length]}
           prevSrcThumbnail={imageList[(photoIndex + imageList.length - 1) % imageList.length]}
           onCloseRequest={() => this.setState({ isOpen: false })}
           onMovePrevRequest={() =>
             this.setState({
               photoIndex: (photoIndex + imageList.length - 1) % imageList.length,
             })
           }
           onMoveNextRequest={() =>
             this.setState({
               photoIndex: (photoIndex + 1) % imageList.length,
             })
           }
         />
       )}
       </div>
     );
   }
 }
  render(){
    return(
      <div className='housedetail container-fluid'>
        <div className="house-detail-top">
          <div className="house-detail-top-margined">
            <AddressDiscription homeData={this.state.homeData}/>
            <div>
              {this.renderHomeTitle()}
            </div>
            <div className='row-reverse-house-adress-type'>
              <RatingDiscription homeData={this.state.homeData}/>
                <ScrollPanel homeData={this.state.homeData}/>
            </div>
          </div>
        </div>
        <div className='house-detail-top'>
          <div className="house-detail-top-margined">
            <div className='reserve-card col-md-3'>
              <p className="text-011">:هزینه هرشب اقامت</p>
              <div className = "price">
                <p className='text-012'> تومان {this.state.homeData.price}</p>
              </div>
              <div className='reserve-button-div'>
                <Button color='twitter' className='reserve-button' onClick ={this.handleClick}>
                  !رزرو کنید
                </Button>
              </div>
              <div>
                {this.renderReservePanel()}
              </div>
            </div>
         <div className='housedetail-img col-md-9'>
           <div>
          {this.renderPreview()}
          {this.renderHouseGallery()}
           </div>
           <div className="col-details-house">
             <AmenitiesDiscription homeData={this.state.homeData} />
             <div className="main-descriptions row">
              <p className='des-header' style={{color:'red',}}> درباره این خانه </p>
              <p className='des-main'> {this.state.homeData.description} </p>
             </div>
             <HostInfoDiscription homeData={this.state.homeData}/>
             <MainDiscription homeData={this.state.homeData} />
             <MapDiscription homeData={this.state.homeData}/>
            </div>
          </div>
        </div>
      </div>y
    </div>
    );
    }
  }
export default HouseDetails;
