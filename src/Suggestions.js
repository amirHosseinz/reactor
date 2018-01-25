import React from 'react';
import { Divider,Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class Suggestions extends React.Component{
  constructor(props) {
  super(props);
  this.state = {
        sugguestionParams:{
          name:'',
          subject:'',
          email:'',
          description:'',
        },
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
    var request = new Request('https://www.trypinn.com/api/suggestion-submit/',{ //
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
    console.log(response);
   });
  }

  SetSuggestionParams(){
    var suggParams={
      name: this.state.name,
      email: this.state.email,
      subject : this.state.subject,
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



  render(){
    return(
      <div>
        <div className='suggestions-cadre'>
          <div className='suggestions-text-area'>
           <p className='suggestions-header'><span>ثبت </span><span  className="shekayat-color">شکایات</span></p>
           <p className='suggestions-paragraphs'>ما همواره آماده ایم تا انتقادات، پیشنهادات و شکایات شما را دریافت نماییم و در کمترین زمان آن را پیگیری کنیم<br/>شما میتوانید از راه های ارتباطی زیر با ما در ارتباط باشید یا به صورت مستقیم شکایت ، پیشنهادات و انتقاد های خود را در همین صفحه ثبت کنید</p>
           <p className='suggestions-paragraphs'>روابط عمومی تریپین: 02188573037</p>
           <p className='suggestions-paragraphs'><span> support@tripinn.ir </span><span>:ایمیل </span></p>
           <p className='suggestions-paragraphs'>ما در تریپین تمام تلاش خود را بکار خواهیم بست تا به بهترین شکل پیگیر درخواست های شما کاربران گرامی باشیم </p>
          </div>
          <div className='suggestions-form'>
            <div className="suggstions-input-item">
              <span>
                <label className='suggestions-labels'>
                  <div className="suggestions-label-text-area">
                    نام:
                  </div>
                <input type="text" className='suggestions form-control' value={this.state.name} onClick={(event)=>{this.Suggestionsname(event)}} />
                </label>
              </span>
            </div>
              <div className="suggstions-input-item">
                <span>
                  <label className='suggestions-labels'>
                    <div className="suggestions-label-text-area">
                      ایمیل:
                    </div>
                  <input type="text" className='suggestions form-control' value={this.state.email} onClick={(event)=>{this.SuggestionsEmail(event)}}/>
                  </label>
                </span>
              </div>
              <div className="suggstions-input-item">
                <span>
                  <label className='suggestions-labels'>
                    <div className="suggestions-label-text-area">
                      موضوع:
                    </div>
                  <input type="text" className='suggestions form-control' value={this.state.subject} onClick={(event)=>{this.SuggestionsSubject(event)}}/>
                  </label>
                </span>
              </div>
              <div class="form-group" className="suggestions-description-container">
                <label className="suggstions-description-textarea" for="comment">توضیحات:</label>
                  <textarea class="form-control" rows="5" id="comment" value={this.state.description} onClick={(event)=>{this.SuggestionsDescription(event)}} ></textarea>
              </div>
              <div className='suggestions-save-button-container'>
              <Button onClick={()=>{this.SetSuggestionParams()}} className="suggestions-save-button" color="orange" >ارسال درخواست </Button>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Suggestions;
