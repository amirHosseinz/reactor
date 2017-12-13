import React from 'react';

class Messages extends React.Component{
  constructor(props){
    super(props);
    this.state={
      token:null,
      role:null,
      requestList:null,
    };
  }
  getRole(){
    return 'guest';
  }
  handleRequestClick(){
    this.setState({token:"460b152177ab02716faa0d7795ff60f12d7cbd9d"},()=>{this.setSearchParams(this.getRole())});
  }
  setSearchParams(person_role){
    this.setState({role :person_role } ,()=>this.getDataFromServer());
  }
  getDataFromServer(){
    var request = new Request('https://www.trypinn.com/api/message/list/',{
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
   .then((messages) => {
     console.log(messages);
     this.renderData(messages);
   });
  }
  renderData(messages){
    console.log('5555555555555555555555555555');
    this.setState({requestList:messages});
  }
  renderRequests(){
    if (this.state.requestList!== null){
      return (
        <div>
        </div>
      );
    }
  }
  render(){
    return(
      <div>
            <button onClick={this.handleRequestClick.bind(this)}>
              messages
			</button>
      </div>

    );
  }
}

export default Messages;
