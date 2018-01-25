import React from 'react';
import { Divider,Button } from 'semantic-ui-react';

class BecomeHost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         token:null,
          firstName:'',
          lastName:'',
          cellPhone:'',
          email:'',
          city:'',
        };

  }


  componentWillMount() {
      this.setState({token:this.getRelevantToken()});
  }

  getRelevantToken(){
    return localStorage['token'];
  }


  getCookie(name){
    if(!document.cookie){
      return null;
    }
    const token =document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(name+'='));
    if(token.length===0){
      return null;
    }
    return decodeURIComponent(token[0].split('=')[1]);
  }

  changeInfOnServer(){
        const csrftoken= this.getCookie('csrftoken');
        console.log(csrftoken);
         console.log(this.state);
    var request = new Request('https://www.trypinn.com/api/host-submit/',{ //
      method: 'POST',
      body: JSON.stringify(
        {
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          phone_no:this.state.cellPhone,
          email:this.state.email,
          city:this.state.city,
        }
      ),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',})
    });
   fetch(request)
   .then((response) => {
     console.log(response);
     return response.json();
     console.log(response);
   })
   .then((response) => {
    console.log(response);
    const message=response.error;
    this.renderAlreadyHost(message);
    this.renderError(message);
    this.renderSuccessful(message)
   });
  }

renderAlreadyHost(message){
  if(message==="account exists."){
    alert ('شماره شما قبلا به عنوان میزبان ثبت شده است.')
  }
}

renderError(message){
  if(message==="error"){
    alert ('خطا! لطفا پس از اطمینان از صحت اطلاعات وارد شده دوباره تلاش کنید.')
  }
}

renderSuccessful(message){
  if(message===null){
    alert ('عملیات با موفقیت انجام شد. به جمع میزبانان تریپین خوش آمدید :)')
  }
}

  editFirstName(event){
    this.setState({firstName : event.target.value});
  }
  editLastName(event){
    this.setState({lastName:event.target.value});
  }
  editEmail(event){
    this.setState({email:event.target.value});
  }
  editCellPhone(event){
    this.setState({cellPhone:event.target.value});
  }
  editCity(event){
    this.setState({city:event.target.value});
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}
export default BecomeHost;
