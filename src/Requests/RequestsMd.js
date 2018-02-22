import React from 'react';
import { Divider } from 'semantic-ui-react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import './Requests.css';

class RequestsMd extends React.Component{
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
    var request = new Request('https://www.trypinn.com/api/request/list/',{
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
      }
      else{

        this.showRequestItemClick({status:'no-house'});
      }
    });

  }

  showRequestItemClick(item){
    this.setState({selected:item.id} ,()=>{this.props.changeRequestDetail(item)});
  }

  handleHighlight(event){
    this.setState({selectedRequest:event.target.id});
  }

  renderRequests(){
      if(this.state.requestList!==null){
        var request_list = this.state.requestList.request_list;
        if(request_list.length>0){
          this.list = request_list.map((item)=>  {
            return(
              <div
                dir="rtl"
                className={(this.state.selected===item.id)?"requests-item-selected":"requests-item-not-selected"}
                key={item.id} onClick={() =>{
                this.showRequestItemClick(item)
                }}>
                  <div>
                  <ListGroupItem className="requests-scroll-list">
                    <div className="requests-item-preview">
                      <img
                      src={"https://www.trypinn.com/"+item.room.preview}
                      alt=""
                      height="78px;" width="80px"/>
                      <div>
                        <div className="requests-item-title">
                          {item.room.title}
                        </div>
                      <p className="requests-item-city">{item.room.address} </p>
                      </div>
                    </div>
                  </ListGroupItem>
                  </div>
            </div>
            );
          }
      );
        return(
          <div className="requests-main-container">
            <ListGroup>{this.list}</ListGroup>
          </div>
           );
        }
    }
  }
  render(){
    return(
      <div>
        {this.renderRequests()}
      </div>
    );
  }
}

export default RequestsMd;
