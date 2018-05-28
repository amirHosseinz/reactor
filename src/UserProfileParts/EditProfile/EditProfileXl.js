import React from 'react';
import {productionURL} from '../../Data.js';
import {englishToPersianDigits} from '../../tools/EnglishToPersianDigits.js';
import {persianArabicToEnglishDigits} from '../../tools/EnglishToPersianDigits.js';
import {ChangePassSuccessModal} from '../../Styles.js';
import Fade from 'react-reveal';
import {ClipLoader} from 'react-spinners';
import Modal from 'react-modal';


class EditProfileXl extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      firstName:'',
      lastName:'',
      cellPhone:'',
      nationalId:'',
      email:'',

      editProfileLoading: false,
      editPasswordLoading : false,
      editProfileEmailHasError : false,
      editProfileCellPhoneHasError : false,
      editProfileNationalIdHasError : false,

      editProfileInputHasError : false,
      editProfileInputError :'خطایی وجود ندارد',

      openEditConfirmationModal : false,
    }
  }

  componentWillMount() {
      this.setState({token:this.getRelevantToken()},()=>{this.setSearchParams(this.getRole())});
  }

  getRelevantToken(){
    return localStorage['token'];
  }


  getRole(){
    return 'guest';
  }

  setSearchParams(person_role){
    this.setState({role :person_role} ,()=>this.getDataFromServer());
  }

  handleSaveInfo(){
        this.setState({role :this.getRole(),editProfileLoading:true} ,()=>this.changeInfoOnServer());
  }

  getDataFromServer(){
    var request = new Request(productionURL + 'auth/api/user/get_info/',{ //
      method: 'POST',
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+ this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((profile) => {
     this.renderData(profile);
   });
  }

  renderData(profile) {
    this.setState({profileInfo:profile,
      profilePicture : "https://www.trypinn.com/" + profile.user.profile_picture,
      firstName:profile.user.first_name,
      lastName:profile.user.last_name,
      cellPhone:profile.user.cell_phone,
      email:profile.user.email,
      nationalId:profile.user.national_id,});
  }

  changeInfoOnServer(){
    var request=new Request(productionURL + 'auth/api/user/edit/',{ //
      method: 'POST',
      body: JSON.stringify(
        {
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          cell_phone:persianArabicToEnglishDigits(this.state.cellPhone),
          email:this.state.email,
          national_id:persianArabicToEnglishDigits(this.state.nationalId),
        }
      ),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     this.setState({editProfileLoading:false});
     return response.json();
   })
   .then((response) => {
     if(response.successful){
       this.setState({openEditConfirmationModal:true,editProfileInputHasError:false,});
       localStorage['user-first-name']=this.state.firstName;
       localStorage['user-last-name']=this.state.lastName;
     }
     else{
       if(response.errors.indexOf('cell_phone')!==-1){
         this.setState({editProfileLoading:false,editProfileCellPhoneHasError:true,editProfileInputError : 'شماره تلفن وارد شده اشتباه است'});
       }
       if(response.errors.indexOf('invalid_email')!==-1){
         this.setState({editProfileLoading:false,editProfileEmailHasError:true ,editProfileInputError : 'ایمیل وارد شده اشتباه است'});
       }
       if(response.errors.indexOf('invalid_national_id')!==-1){
         this.setState({editProfileLoading:false,editProfileNationalIdHasError:true , editProfileInputError :'کد ملی وارد شده اشتباه است'});
       }
       if(response.errors.indexOf('exist_email')!==-1){
         this.setState({editProfileLoading:false,editProfileEmailHasError:true , editProfileInputError :'ایمیل وارد شده قبلا توسط شخص دیگری استفاده شده است'});
       }
       if(response.errors.indexOf('exist_national_id')!==-1){
         this.setState({editProfileLoading:false,editProfileNationalIdHasError:true , editProfileInputError :'شماره ملی وارد شده قبلا توسط شخص دیگری استفاده شده است'});
       }
       if(this.state.editProfileEmailHasError || this.state.editProfileNationalIdHasError || this.state.editProfileCellPhoneHasError){
         this.setState({editProfileInputHasError : true});
       }
     }
   })
   .catch((error)=> {
        if(error.message==="NetworkError when attempting to fetch resource."){
          this.setState({editProfileLoading:false,editProfileInputError:'خطا در برقراری ارتباط با سرور', editProfileInputHasError:true});
        }
      });
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

  editNationalId(event){
    this.setState({nationalId:event.target.value});
  }

  renderEditConfirmationModal(){
    if(this.state.openEditConfirmationModal) {
      return(
        <Modal isOpen={this.state.openEditConfirmationModal}
               onRequestClose={()=>{this.setState({openEditConfirmationModal:false})}}
               style={ChangePassSuccessModal}>
           <div className='change-pass-success-container'>
             <p>
               اطلاعات کاربری شما با موفقیت تغییر کرد
             </p>
             <img className='change-pass-success-tick' src={require('../../Images/changePassSuccess.svg')} width="40" height="40"/>
             <button className='change-pass-success-button' onClick={()=>{this.setState({openEditConfirmationModal:false})}}>
               بستن
             </button>
           </div>
         </Modal>
      );
    }
  }
  renderEditProfile(){
    return(
      <div className="user-profile-edit-main-division">
        <div className="user-profile-edit-secondary-heading">
          <p className="user-profile-edit-secondary-heading-title">
            مشخصات کاربری
          </p>
          <p className="user-profile-edit-secondary-heading-description">
           بر اساس قوانین، اطلاعات مندرج شما در این سامانه محفوظ خواهد ماند.
          </p>
        </div>
        <div onKeyDown={()=>{this.setState({editProfileInputHasError:this.state.editProfileEmailHasError || this.state.editProfileNationalIdHasError || this.state.editProfileCellPhoneHasError })}} className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
            نام
            </span>
          </div>
          <input value={this.state.firstName} onChange={(event)=>{this.editFirstName(event)}} className="user-profile-edit-input"/>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
             نام خانوادگی
            </span>
            <span className="user-profile-edit-input-paragraph-description">
            </span>
          </div>
          <input value={this.state.lastName} onChange={(event)=>{this.editLastName(event)}}className="user-profile-edit-input" />
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
               شماره همراه
            </span>
            <span> </span>
            <span className="user-profile-edit-input-paragraph-description">
          (از این شماره برای ورود به اپلیکیشن و سایت سامانه استفاده خواهد شد)
            </span>
          </div>
          <input onKeyDown={(event)=>{this.setState({editProfileCellPhoneHasError:false})}} value={englishToPersianDigits(this.state.cellPhone)} onChange={(event)=>{this.editCellPhone(event)}} className={this.state.editProfileCellPhoneHasError ? "user-profile-edit-input-wrong": "user-profile-edit-input"} />
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
              کد ملی
            </span>
            <span> </span>
            <span className="user-profile-edit-input-paragraph-description">
          (ثبت کد ملی صحیح و منطبق با نام و نام خانوادگی برای رزرو ضروری می‌باشد)
            </span>
          </div>
          <input onKeyDown={(event)=>{this.setState({editProfileNationalIdHasError:false})}} value={englishToPersianDigits(this.state.nationalId)} onChange={(event)=>{this.editNationalId(event)}} className={this.state.editProfileNationalIdHasError ? "user-profile-edit-input-wrong": "user-profile-edit-input"}/>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
            ایمیل
            </span>
            <span> </span>
            <span className="user-profile-edit-input-paragraph-description">
            (اختیاری)
            </span>
          </div>
          <input onKeyDown={(event)=>{this.setState({editProfileEmailHasError:false})}} value={this.state.email} onChange={(event)=>{this.editEmail(event)}} className={this.state.editProfileEmailHasError ? "user-profile-edit-input-wrong": "user-profile-edit-input"} />
        </div>
        <Fade bottom={true} collapse={false} when={this.state.editProfileInputHasError}>
          <div className="edit-profile-input-error-visible">
            {this.state.editProfileInputError}
          </div>
        </Fade>
        <button onClick={()=>{this.handleSaveInfo()}}className="user-profile-edit-save-changes-button">
          {this.state.editProfileLoading ? <ClipLoader size={30} color="white"/> : "ذخیره تغییرات"}
        </button>
      </div>
    );
  }

  render(){
    return(
      <div className="user-panel-section-edit-profile-version">
        {this.renderEditProfile()}
        {this.renderEditConfirmationModal()}
      </div>
    );
  }
}

export default EditProfileXl;
