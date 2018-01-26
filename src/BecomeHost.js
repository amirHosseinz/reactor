import React from 'react';
import { Divider,Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
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
        <div className='become-host-cadre'>
          <div className='become-host-descriptions-form-section col-md-5'>
            <div className='become-host-descriptions-form'>
            <div className="become-host-input-item">
            <span>
            <label className='become-host-labels'>
            <div className="become-host-label-text-area">
            نام:
            </div>
            <input type="text" className='become-host-labels form-control' value={this.state.firstName} onChange={this.editFirstName.bind(this)} />
            </label>
            </span>
            </div>
            <div className="become-host-input-item">
            <label className='become-host-labels'>
            <div className="become-host-label-text-area">
            نام خانوادگی:
            </div>
            <input type="text" className='become-host-labels form-control' value={this.state.lastName} onChange={this.editLastName.bind(this)} />
            </label>
            </div>
            <div className="become-host-input-item">
            <span>
            <label className='become-host-labels'>
            <div className="become-host-label-text-area">
            شماره تلفن:
            </div>
            <input type="text" className='become-host-labels form-control' value={this.state.cellphone} onChange={this.editCellPhone.bind(this)} />
            </label>
            </span>
            </div>
            <div className="become-host-input-item">
            <span>
            <label className='become-host-labels'>
            <div className="become-host-label-text-area">
            شهر:
            </div>
            <input type="text" className='become-host-labels form-control' value={this.state.city} onChange={this.editCity.bind(this)} />
            </label>
            </span>
            </div>
            <div className="become-host-input-item">
            <label className='become-host-labels' >
            <div className="become-host-label-text-area">
            ایمیل
              </div>
              <input type="text" className='become-host-labels form-control' value={this.state.email} onChange={this.editEmail.bind(this)} />
              </label>
              <div className='become-host-save-button-container'>
              <Button className="become-host-save-button" color="orange" onClick={this.changeInfOnServer.bind(this)}>ارسال درخواست </Button>

              </div>
              </div>
            </div>
          </div>
          <div className='become-host-descriptions-container col-md-7'>
            <div className='become-host-descriptions-main'>
              <p className='become-host-descriptions-header'><span className="mizban-color">میزبان </span><span>شوید</span></p>
              <p className='become-host-descriptions-paragraph1'>در هر نقطه ای از ایران که هستید میتوانیید با اجاره روزانه ویلا و اقامتگاه خود به دیگران کسب درآمد کنید. تریپین به شما کمک میکند با صرف کمترین زمان و به آسانی از فرصت های اجاره اقامتگاه خود آگاه شوید<br/>کافی است فرم مقابل را کامل نمایید. کارشناسان ما به زودی با شما تماس خواهند گرفت و در تمامی مراحل شمارا همراهی خواهند کرد</p>
            </div>
            <div className='become-host-descriptions-support'>
            <p className='become-host-descriptions-paragraph1'><span> در صورت هرگونه سوال درباره نحوه همکاری با تریپین میتوانید با </span><span><Link to="/contactus">پشتیانی </Link></span><span> تماس بگیرید </span></p>
            </div>
          </div>

        </div>

      </div>
    );
  }
}
export default BecomeHost;
