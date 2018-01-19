import React from 'react';
import { Divider,Button } from 'semantic-ui-react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import 'react-virtualized/styles.css'
import { Column, Table } from 'react-virtualized'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
import { Image } from 'semantic-ui-react';


class Requests extends React.Component{
  constructor(props){
    super(props);
    this.state={
      token:null,
      selectedRequest:'',
      role:null,
      requestList:null,
    };
  }
  componentWillMount() {
      this.setState({token:this.getRelevantToken()},()=>{this.setSearchParams(this.getRole())});
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
    this.setState({requestList:request_list});
  }

  showRequestItemClick(item){
    this.props.changeRequestDetail(item);
  }

  handleHighlight(event){
    console.log(event.target.id);
    this.setState({selectedRequest:event.target.id});
  }
  renderRequests(){
      if(this.state.requestList!==null){
        var request_list = this.state.requestList.request_list;
        var list = request_list.map((item)=>
        <div>
          <div
             dir="rtl"
            className="userpanel-item-list hidden-xs visible-xl"
            key={item.id} onClick={() =>{
            this.showRequestItemClick(item)
            }}>
              <ListGroupItem className="scroll-list-requests">
                <div className="preview-x">
                  <img
                  src={"https://www.trypinn.com/"+item.room.preview}
                  alt=""
                  height="78px;" width="80px"/>
                  <div>
                    <div className="request-list-item-title">
                      {item.room.title}
                    </div>
                  <p className="request-list-item-city">  {item.room.address} </p>
                  </div>
                </div>
              </ListGroupItem>
        </div>
        <div
           dir="rtl"
          className="userpanel-item-list-xs hidden-xl visible-xs"
          key={item.id} onClick={() =>{
          this.showRequestItemClick(item)
          }}>
            <div className="scroll-list-requests-xs">
              <div className="preview-x2">
                <div className="row-reverse">
                  <img
                  src={"https://www.trypinn.com/"+item.room.preview}
                  alt=""
                  height="55px;" width="55px"/>
                  <br/>
                  <div>
                    <div className="request-list-item-title">
                      {item.room.title}
                    </div>
                    <p className="request-list-item-city">  {item.room.address} </p>
                  </div>
                </div>
                <div>
                  <Image className='arrow-ico' src={require('./Images/arrow-down.svg')}/>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
      return(
       <ListGroup>{list}</ListGroup>
         );
      }
  }
  render(){
    return(
      <div>
        <div className="list-of-request-div hidden-xs visible-xl">
            {this.renderRequests()}
        </div>
        <div className="list-of-request-div-xs hidden-xl visible-xs">
            {this.renderRequests()}
        </div>
      </div>
    );
  }
}
export default Requests;
