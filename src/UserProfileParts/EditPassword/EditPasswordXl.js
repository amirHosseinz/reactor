import React from 'react';
import {productionURL} from '../../Data.js';
import {ChangePassSuccessModal} from '../../Styles.js';
import Fade from 'react-reveal';
import {ClipLoader} from 'react-spinners';
import Modal from 'react-modal';

class EditPasswordXl extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      oldPassword : '',
      password : '',
      confirmPassword:'',
      openPassConfirmationModal:false,
      changePasswordOldPassHasError : false,
      changePasswordNewPassHasError : false,
      changePasswordConfirmPassHasError : false,
      changePasswordInputHasError : false,
      changePasswordInputError : 'خطایی وجود ندارد',
    }
  }

  getRelevantToken(){
    return localStorage['token'];
  }

  getRole(){
    return 'guest';
  }

  handleChangePassword(){
    if(this.state.oldPassword===''){
      this.setState({changePasswordInputHasError : true, changePasswordOldPassHasError:true,changePasswordInputError:'لطفا همه فیلد های لازم را پر کنید'});
    }
    if(this.state.password===''){
      this.setState({changePasswordInputHasError : true, changePasswordNewPassHasError:true,changePasswordInputError:'لطفا همه فیلد های لازم را پر کنید'});
    }
    if(this.state.confirmPassword===''){
      this.setState({changePasswordInputHasError : true, changePasswordConfirmPassHasError:true,changePasswordInputError:'لطفا همه فیلد های لازم را پر کنید'});
      return;
    }
    if(this.state.oldPassword!=='' && this.state.password!=='' && this.state.confirmPassword !== ''){
      if(this.state.confirmPassword!== this.state.password){
          this.setState({changePasswordInputHasError : true, changePasswordConfirmPassHasError:true,changePasswordInputError:'رمز عبور جدید و تکرار آن یکسان نیستند'},);
      }
    }
    if(this.state.oldPassword!=='' && this.state.password!=='' && this.state.confirmPassword !== '' && this.state.confirmPassword===this.state.password){
      this.setState({role :this.getRole(),editPasswordLoading:true} ,()=>this.changePasswordOnServer());
    }
  }

  changePasswordOnServer(){
    var request = new Request(productionURL + 'auth/api/user/edit/edit_password/',{ //
      method: 'POST',
      body: JSON.stringify(
        {
          old_password:this.state.oldPassword,
          password : this.state.password,
          confirm_password : this.state.confirmPassword,
        }
      ),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+this.getRelevantToken(),})
    });
   fetch(request)
   .then((response) => {
     this.setState({editPasswordLoading:false});
     return response.json();
   })
   .then((response) => {
     this.handleChangePasswordResponse(response);
   })
   .catch((error)=> {
        if(error.message==="NetworkError when attempting to fetch resource."){
          this.setState({editPasswordLoading:false,changePasswordInputError:'خطا در برقراری ارتباط با سرور', changePasswordInputHasError:true});
        }
      });
  }

  handleChangePasswordResponse(response) {
    if(response.successful){
      this.setState({openPassConfirmationModal:true});
    }
    else {
      if(response.errors.indexOf("invalid_password" )!==-1) {
        this.setState({changePasswordOldPassHasError:true , changePasswordInputHasError:true , changePasswordInputError:'رمز عبور وارد شده اشتباه است'});
        return;
      }
      if(response.errors.indexOf("This password is too short. It must contain at least 6 characters.")!==-1) {
        this.setState({changePasswordNewPassHasError : true, changePasswordInputHasError:true , changePasswordInputError:'رمز عبور شما باید حداقل دارای شش کاراکتر باشد'});
        return;
      }
      if(response.errors.indexOf("This password is entirely numeric.")!==-1) {
        this.setState({changePasswordNewPassHasError : true, changePasswordInputHasError:true , changePasswordInputError:'کلمه عبور شما باید حداقل شامل یک حرف باشد'});
        return;
      }
      if(response.errors.indexOf("The password is too similar to the username.")!==-1) {
        this.setState({changePasswordNewPassHasError : true, changePasswordInputHasError:true , changePasswordInputError:'کلمه عبور شما مشابه دیگر اطلاعات کاربری شماست'});
        return;
      }
      if(response.errors.indexOf("This password is too common.")!==-1) {
        this.setState({changePasswordNewPassHasError : true, changePasswordInputHasError:true , changePasswordInputError:'رمز عبور انتخاب شده معتبر نیست'});
        return;
      }
    }
  }


  renderPassConfirmationModal(){
   if(this.state.openPassConfirmationModal===true){
     return(
       <Modal isOpen={this.state.openPassConfirmationModal}
       onRequestClose={()=>{window.location.reload()}}
              style={ChangePassSuccessModal}>
        <div className='change-pass-success-container'>
          <p>
            رمز عبور شما با موفقیت تغییر کرد
          </p>
          <img className='change-pass-success-tick' src={require('../../Images/changePassSuccess.svg')} width="40" height="40"/>
          <button className='change-pass-success-button' onClick={()=>{window.location.reload()}}>
            بستن
          </button>
        </div>
      </Modal>
    );
  }
 }

    editPassword(event){
      this.setState({password:event.target.value});
    }
    editConfirmPassword(event){
      this.setState({confirmPassword:event.target.value});
    }
    editOldPassoword(event){
      this.setState({oldPassword:event.target.value});
    }

  renderEditPassword(){
    return (
      <div className="user-profile-edit-main-division">
        <div className="user-profile-edit-secondary-heading">
          <p className="user-profile-edit-secondary-heading-title">
            رمز عبور
          </p>
          <p className="user-profile-edit-secondary-heading-description">
            در صورت نیاز به تغییر رمز عبور، این بخش را ویرایش کنید. در غیر اینصورت رمز عبور سابق شما ثبت شده می‌ماند.
          </p>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title-password-section">
           رمز عبور فعلی
            </span>
          </div>
            <input onKeyDown={()=>{this.setState({changePasswordOldPassHasError:false})}} type="password" value={this.state.oldPassword} onChange={(event)=>{this.editOldPassoword(event)}} className={this.state.changePasswordOldPassHasError ?"user-profile-edit-input-password-section-wrong" :"user-profile-edit-input-password-section" } />
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title-password-section">
              رمز عبور جدید
            </span>
          </div>
          <input onKeyDown={()=>{this.setState({changePasswordNewPassHasError:false})}}  type="password" value={this.state.password} onChange={(event)=>{this.editPassword(event)}} className={this.state.changePasswordNewPassHasError ?"user-profile-edit-input-password-section-wrong" :"user-profile-edit-input-password-section" }/>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title-password-section">
               تکرار رمز عبور جدید
            </span>
          </div>
          <input onKeyDown={()=>{this.setState({changePasswordConfirmPassHasError:false})}} type="password" value={this.state.confirmPassword} onChange={(event)=>{this.editConfirmPassword(event)}} className={this.state.changePasswordConfirmPassHasError ?"user-profile-edit-input-password-section-wrong" :"user-profile-edit-input-password-section" }/>
        </div>
        <Fade bottom={true} collapse={false} when={this.state.changePasswordInputHasError}>
          <div className="edit-profile-input-error-visible">
            {this.state.changePasswordInputError}
          </div>
        </Fade>
        <button onClick={()=>{this.setState({changePasswordInputHasError:false},()=>{this.handleChangePassword()})}} className="user-profile-edit-save-changes-button">
          {this.state.editPasswordLoading ? <ClipLoader color="white" size={30}/> : "تغییر رمز عبور"}
        </button>
      </div>
    );
  }
  render(){
    return(
      <div className="user-panel-section-edit-password-version">
        {this.renderEditPassword()}
        {this.renderPassConfirmationModal()}
      </div>
    );
  }
}

export default EditPasswordXl;
