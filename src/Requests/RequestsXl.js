import React from 'react';
import { Divider } from 'semantic-ui-react';
import './Requests.css';
import ScrollArea from 'react-scrollbar';
import {productionURL} from'../Data.js';


class RequestsXl extends React.Component{
  constructor(props){
    super(props);
    this.list=[];
    this.state={
      selected:0,
      token:null,
      selectedRequest:'',
      role:null,
      requestList:null,
      firstItem:null,
    };
  }
  componentWillMount() {
      this.setState({token:this.getRelevantToken()},()=>{this.setSearchParams(this.getRole())});
  }

  componentWillReceiveProps(nextProps){
    if(this.props.reRender!==nextProps.reRender){
        this.setSearchParams(this.getRole());
    }
  }

  getRelevantToken(){
    if(localStorage['isLoggedIn']==='true'){
      return localStorage['token'];
    }
    else{
      return localStorage['token'];
    }
  }
  getRole(){
    return 'guest';
  }

  setSearchParams(person_role){
    this.setState({role :person_role},()=>this.getDataFromServer())
  }
  getDataFromServer(){
    var request = new Request(productionURL + 'api/v1/request/list/',{
      method: 'POST',
      body: JSON.stringify({
        platform:'web',
        role:this.state.role,
    }),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+ this.state.token,})
    });
   fetch(request)
   .then((response) => {

     return response.json();
   })
   .then((request_list) => {
     this.renderData(request_list);
   });
  }
  renderData(request_list){
    this.setState({requestList:request_list},()=>{
      if(request_list.request_list.length>0){

        this.showRequestItemClick(request_list.request_list[0]);
        // this.props.changeHasRequest(true);
      }
      else{

        this.showRequestItemClick({status:'no-house'});
        // this.props.changeHasRequest(false);
      }
    });
  }

  showRequestItemClick(item){
    this.setState({selected:item.id} ,()=>{this.props.changeRequestDetail(item)});
  }

  handleHighlight(event){
    this.setState({selectedRequest:event.target.id});
  }

  renderRequestsVersion2(){
    if(this.state.requestList!==null){
      var request_list = this.state.requestList.request_list;
      if(request_list.length>0){
        this.list = request_list.map((item)=>  {
          if(item.room ===null)
            var data = item.eco_room;
          else
            var data = item.room;
          return(
            <div
              dir="rtl"
              className={(this.state.selected===item.id)?"requests-item-selected":"requests-item-not-selected"}
              key={item.id} onClick={() =>{
              this.showRequestItemClick(item)
              }}>
                <div>
                  <div className="requests-item-preview">
                    <img
                    className="requests-item-image"
                    src={"https://www.trypinn.com/"+ data.preview}
                    alt=""
                    height="60px;" width="60px"/>
                    <div>
                      <div className="requests-item-title">
                        {data.title}
                      </div>
                    <p className="requests-item-city">
                      {data.address}
                    </p>
                    </div>
                  </div>
                </div>
          </div>
          );
        }
      );
      return(
        <div className="requests-main-container">
          <p className="requests-title">
              درخواست‌ها
          </p>
          <hr className="requests-divider"/>
          <ScrollArea className="requests-list-main-container" smoothScrolling={false} stopScrollPropagation={true} speed={1} horizontal={false}>
            {this.list}
          </ScrollArea>
        </div>
         );
      }
    }
  }
  render(){
    return(
      <div>
        {this.renderRequestsVersion2()}
      </div>
    );
  }
}

export default RequestsXl;
