import React from 'react';
import { Divider,Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits.js';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-modal';
import {suggestionResponseModalStyle} from '../Styles.js';
import './Suggestions.css';
import {productionURL} from'../Data.js';


class SuggestionsXl extends React.Component{
  constructor(props){
  super(props);
  this.state = {
        sugguestionParams:{
          name:'',
          subject:'',
          email:'',
          description:'',
        },
        errors:'',
        showResponseModal:false,
        responseIsSuccesful:false,
        token:null,
        name:'',
        subject:'',
        email:'',
        description:'',
      };
}
componentWillMount() {
    this.setState({token:this.getRelevantToken()});
}

getRelevantToken(){
  return localStorage['token'];
}

  sendSuggestion(){
    var request = new Request(productionURL+'api/suggestion-submit/',{ //
      method: 'POST',
      body: JSON.stringify(
        {
          name:this.state.sugguestionParams.name,
          email:this.state.sugguestionParams.email,
          description:this.state.sugguestionParams.description,
          subject:this.state.sugguestionParams.subject,
        }
      ),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((response) => {
     this.setState({responseIsSuccesful:response.is_successful,showResponseModal:true,});
     const errors=response.errors.toString()
     console.log(errors);
     this.setState({errors:response.errors.toString()});
   });
  }

  SetSuggestionParams(){
    var suggParams={
      name:this.state.name,
      email:this.state.email,
      subject:this.state.subject,
      description:this.state.description,
    }
    this.setState({sugguestionParams:suggParams},()=>{this.sendSuggestion();});
  }

  SuggestionsDescription(event){
    this.setState({description:event.target.value});
  }

  SuggestionsSubject(event){
    this.setState({subject:event.target.value});
  }

  SuggestionsEmail(event){
    this.setState({email:event.target.value});
  }

  Suggestionsname(event){
    this.setState({name:event.target.value});
  }
  handleRequiredFieldsModal(){
    if (this.state.errors.indexOf('Ensure this value has at most 100 characters') > -1) {
      return(
        <div>
       نام وارد شده معتبر نمی‌باشد
        </div>
      );
    }
  }
  handleInvalidEmailModal(){
    if (this.state.errors.indexOf('Enter a valid email address.') > -1) {
      return(
        <div>
        ایمیل وارد شده صحیح نمی‌باشد
        </div>
      );
    }
  }

  handleResponseModal(){
    if(this.state.responseIsSuccesful===true){
      return(
        <div>
         پیشنهاد شما با موفقیت ثبت شد
        </div>
      );
    }
    else{
      return(
        <div>

          پیشنهاد شما با موفقیت ثبت نشد
        </div>
      );
    }
  }
  renderResponseModal(){
    return(
      <Modal isOpen={this.state.showResponseModal}
      onRequestClose={()=>{this.setState({showResponseModal:false})}}
      style={suggestionResponseModalStyle}>
        {this.handleResponseModal()}
        {this.handleInvalidEmailModal()}
        {this.handleRequiredFieldsModal()}
      </Modal>
    );
  }
  render(){
    return(
      <div>
        <div className='suggestions-cadre-xl'>
          <div className='suggestions-text-area'>
           <p className='suggestions-header'><span>ثبت </span><span  className="shekayat-color">شکایات</span></p>
           <p className='suggestions-paragraphs'>
           ما همواره آماده‌ایم تا انتقادات، پیشنهادات و شکایات شما را دریافت نماییم و در کمترین زمان آن را پیگیری کنیم. شما می‌توانید از راه‌های ارتباطی زیر با ما در تماس باشید یا به صورت مستقیم نظرات خود را در همین صفحه ثبت کنید.
           </p>
           <p className='suggestions-paragraphs'>
               <span> روابط عمومی تریپین : </span><span>{englishToPersianDigits('88573037 - 021')} </span>
            </p>
           <p className='suggestions-paragraphs'><span> ایمیل :  </span><span> support@tripinn.ir </span></p>
           <p className='suggestions-paragraphs'>
           ما در تریپین تمام تلاش خود را به‌کار خواهیم بست تا به بهترین شکل پیگیر درخواست‌های شما کاربران گرامی باشیم.
           </p>
          </div>
          <div className='suggestions-form'>
            <div className="suggstions-input-item">
              <span>
                <label className='suggestions-labels'>
                  <div className="suggestions-label-text-area">
                    نام
                  </div>
                <input type="text" className='suggestions input-tripinn1' value={this.state.name} onChange={(event)=>{this.Suggestionsname(event)}} />
                </label>
              </span>
            </div>
              <div className="suggstions-input-item">
                <span>
                  <label className='suggestions-labels'>
                    <div className="suggestions-label-text-area">
                      ایمیل
                    </div>
                  <input type="text" className='suggestions input-tripinn1' value={this.state.email} onChange={(event)=>{this.SuggestionsEmail(event)}}/>
                  </label>
                </span>
              </div>
              <div className="suggstions-input-item">
                <span>
                  <label className='suggestions-labels'>
                    <div className="suggestions-label-text-area">
                      موضوع
                    </div>
                  <input type="text" className='suggestions input-tripinn1' value={this.state.subject} onChange={(event)=>{this.SuggestionsSubject(event)}}/>
                  </label>
                </span>
              </div>
              <div className="suggestions-description-container">
                <label className="suggstions-description-textarea">توضیحات</label>
                  <textarea style={{minHeight:"150px",minWidth:"80%" ,maxHeight:"150px" ,maxWidth:"80%"}} wrap="hard" className="suggestions form-control-tripinn" rows="5"  value={this.state.description} onChange={(event)=>{this.SuggestionsDescription(event)}} />
              </div>
              <div className='suggestions-save-button-container'>
              <Button onClick={()=>{this.SetSuggestionParams()}} className="suggestions-save-button" color="orange" > ارسال پیام  </Button>
              </div>
          </div>
        </div>
        <div>
        </div>
        {this.renderResponseModal()}
        {this.handleInvalidEmailModal()}
        {this.handleRequiredFieldsModal()}
      </div>
    );
  }
}

export default SuggestionsXl;
