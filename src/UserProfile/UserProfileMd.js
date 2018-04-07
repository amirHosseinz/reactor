import React from 'react';
import { englishToPersianDigits,persianArabicToEnglishDigits} from '../tools/EnglishToPersianDigits';
import { Divider,Button } from 'semantic-ui-react';
import './UserProfile.css';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import {UserProfileUploadPhotoModal} from '../Styles.js';
import Dropzone from 'react-dropzone';
import {SyncLoader,ClipLoader} from 'react-spinners';
import {ChangePassSuccessModal,ChangePassFailedModal} from '../Styles.js';
import {parsePrice3digits} from '../tools/ParsePrice3digits.js';
import Fade from 'react-reveal';
import MetaTags from 'react-meta-tags';
import ScrollArea from 'react-scrollbar';


class UserProfileMd extends React.Component{
  constructor(props){
    super(props);
    this.state={
      ImgHint:false,
      token:null,
      role:null,
      profileInfo:null,
      firstName:'',
      selectedPanel:'edit-profile',
      lastName:'',
      bookmarkList:null,
      loading:false,
      cellPhone:'',
      showUploadPhotoModal:false,
      oldPassword:'',
      email:'',
      password : '',
      confirmPassword:'',
      nationalId:'',
      profilePicture : null,
      openPassConfirmationModal:false,
      openEditConfirmationModal : false,

      editProfileLoading: false,
      editPasswordLoading : false,
      editProfileEmailHasError : false,
      editProfileCellPhoneHasError : false,
      editProfileNationalIdHasError : false,

      editProfileInputHasError : false,
      editProfileInputError :'خطایی وجود ندارد',

      changePasswordOldPassHasError : false,
      changePasswordNewPassHasError : false,
      changePasswordConfirmPassHasError : false,
      changePasswordInputHasError : false,
      changePasswordInputError : 'خطایی وجود ندارد',
    };
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
    this.setState({role :person_role } ,()=>this.getDataFromServer());
  }
  getDataFromServer(){
    var request = new Request('https://www.trypinn.com/auth/api/user/get_info/',{ //
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
  this.getBookmarkListFromServer();
  }
  getBookmarkListFromServer(){
    var request = new Request('https://www.trypinn.com/bookmark/api/list/',{ //
      method: 'POST',
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+ this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((list) => {
     this.setState({bookmarkList:list.faved_rooms});
   });
  }

  renderData(profile){
    this.setState({profileInfo:profile,
      profilePicture : "https://www.trypinn.com/" + profile.user.profile_picture,
      firstName:profile.user.first_name,
      lastName:profile.user.last_name,
      cellPhone:profile.user.cell_phone,
      email:profile.user.email,
      nationalId:profile.user.national_id,});
  }

  renderUploadImageHint(){
    if(this.state.ImgHint===false){
      return null;
    }
    if(this.state.ImgHint===true){
      return(
        <div onClick={()=>{this.setState({showUploadPhotoModal:true})}} className="profile-img-hint">
          <img height="100px" width="100px" src={require('../Images/change-avatar-icon.svg')} />
        </div>
      );
    }
  }

  onDrop(files){
    if(files.length>0){
      this.setState({profilePicture:files[0].preview,profilePictureFile:files[0]});
    }
  }
  renderLoadingOrSelect(){
    if(this.state.loading===false){
      return(
        <div className="user-profile-upload-photo-modal-image-selection-button">
          انتخاب تصویر
        </div>
      );
    }
    else{
      return(
        <div className="user-profile-upload-photo-modal-loading-indicator">
          <SyncLoader size={15} color="#26c4df" loading={true}/>
        </div>
      );
    }
  }
  renderUploadPhotoModal(){
    return(
      <Modal isOpen={this.state.showUploadPhotoModal}
             onRequestClose={()=>{this.setState({showUploadPhotoModal:false,profilePicture:"https://www.trypinn.com/" + this.state.profileInfo.user.profile_picture})}}
             style={UserProfileUploadPhotoModal}>
               <div className="user-profile-upload-photo-modal-main-division">
                <div onClick={()=>{this.setState({showUploadPhotoModal:false,profilePicture:"https://www.trypinn.com/" + this.state.profileInfo.user.profile_picture})}} className="close-modal-phone-number">
                </div>
                <p className="user-profile-upload-photo-modal-title">
                  تصویر پروفایل
                </p>
                <hr className="user-profile-upload-photo-modal-divider"/>
               <Dropzone accept="image/*" className="user-profile-upload-photo-modal-drop-zone" multiple={false} onDrop={(files)=>{this.onDrop(files)}}>
                 <div className="user-profile-upload-photo-modal-image-zone">
                  <img className="user-profile-upload-photo-modal-image" src={this.state.profilePicture} alt=""  height="250px" width="250px"/>
                  {this.renderLoadingOrSelect()}
                 </div>
               </Dropzone>
               <p onClick={()=>{this.setState({profilePicture:null})}} className="user-profile-upload-photo-modal-delete-selection">
                حذف تصویر
               </p>
               <div onClick={()=>{this.setState({loading:true},()=>{this.handleChangeProfilePicture()})}} className="user-profile-upload-photo-modal-save-selection">
                ذخیره
               </div>
               </div>
      </Modal>
    );
  }

  deleteProfilePicture(){

  }
  handleChangeProfilePicture(){
    var fd = new FormData();
    fd.append('profile_picture' , this.state.profilePictureFile);
    var request = new Request('https://www.trypinn.com/auth/api/user/edit/',{
      method: 'POST',
      body: fd,
      headers: new Headers({'Accept': 'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((response) => {
     // console.log(response);
     if(response.successful){
       localStorage['user-profile-picture'] = response.user.profile_picture;
       window.location.reload();
     }
   });
  }

  ChangeImgHintState(){
    this.setState({ImgHint: true,});
  }
  ReChangeImgHintState(){
      this.setState({ImgHint: false,});
  }

  renderProfilePhoto(){
      if (this.state.profileInfo !== ''){
        if (this.state.profileInfo.user.profile_picture === null){
          return(
            <div className="user-profile-profile-picture-container" onMouseEnter={this.ChangeImgHintState.bind(this)} onMouseLeave={this.ReChangeImgHintState.bind(this)}>
              <img className="user-profile-profile-picture" src={require('../HouseDetailParts/facilities/prof_avatar_tripinn.svg')} height="200px" width="200px"  alt = "" />
              {this.renderUploadImageHint()}
            </div>
          );
        }
        else{
          return(
            <div className="user-profile-profile-picture-container" onMouseEnter={this.ChangeImgHintState.bind(this)} onMouseLeave={this.ReChangeImgHintState.bind(this)}>
              <img className="user-profile-profile-picture" height="200px" width="200px" src={'https://www.trypinn.com/'+this.state.profileInfo.user.profile_picture} />
              {this.renderUploadImageHint()}
            </div>
          );
        }
      }
    }
    getRelevantToken(){
       return localStorage['token'];
     }
  renderUserProfile(){
    if (this.state.profileInfo!== null){

      return(
        <div className='profile-container-sts'>

              <div className="profile_photobox">
                {this.renderProfilePhoto()}
              </div>
              <div className="userprofilebox">
                <div className='username_offical'>
                    <p>{this.state.profileInfo.user.first_name} {this.state.profileInfo.user.last_name}</p>
                </div>
              </div>
              <div className="profile_after_username">
                <Divider />
              </div>
        </div>
      );
    }
}
  handleSaveInfo(){
        this.setState({role :this.getRole(),editProfileLoading:true} ,()=>this.changeInfoOnServer());
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
    var request = new Request('https://www.trypinn.com/auth/api/user/edit/edit_password/',{ //
      method: 'POST',
      body: JSON.stringify(
        {
          old_password:this.state.oldPassword,
          password : this.state.password,
          confirm_password : this.state.confirmPassword,
        }
      ),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+this.state.token,})
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
             <img className='change-pass-success-tick' src={require('../Images/changePassSuccess.svg')} width="40" height="40"/>
             <button className='change-pass-success-button' onClick={()=>{this.setState({openEditConfirmationModal:false})}}>
               بستن
             </button>
           </div>
         </Modal>
      );
    }
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
        onRequestClose={()=>{this.setState({openPassConfirmationModal:false,password : "" , confirmPassword: "" , oldPassword : ""})}}
               style={ChangePassSuccessModal}>
         <div className='change-pass-success-container'>
           <p>
             رمز عبور شما با موفقیت تغییر کرد
           </p>
           <img className='change-pass-success-tick' src={require('../Images/changePassSuccess.svg')} width="40" height="40"/>
           <button className='change-pass-success-button' onClick={()=>{this.setState({openPassConfirmationModal:false,password : "" , confirmPassword:"" , oldPassword : ""})}}>
             بستن
           </button>
         </div>
       </Modal>
     );
   }
 }

  changeInfoOnServer(){
    var request=new Request('https://www.trypinn.com/auth/api/user/edit/',{ //
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
  editPassword(event){
    this.setState({password:event.target.value});
  }
  editConfirmPassword(event){
    this.setState({confirmPassword:event.target.value});
  }
  editOldPassoword(event){
    this.setState({oldPassword:event.target.value});
  }

  renderUserProfileDetailsSection(){
    if(this.state.profileInfo!==null){
      return(
        <div className="user-profile-in-details-main-division-md">
        {this.renderProfilePhoto()}
          <div className="user-profile-user-name">
          </div>
          <hr className="user-profile-in-details-divider"/>


          <Link to="/dashboard/request">
          <div className="user-profile-in-details-link">
             مشاهده درخواست‌ها
          </div>
          </Link>
          <Link to="/dashboard/trip">
            <div className="user-profile-in-details-link">
              مشاهده سفر‌ها
            </div>
          </Link>


        </div>
      );
    }
  }

  removeItemFromList(item){
    var tempList = this.state.bookmarkList;
    for (var itemCounter=0 ; itemCounter<tempList.length;itemCounter++){
      if(item.id===tempList[itemCounter].id){
        tempList.splice(itemCounter, 1);
      }
    }
    this.setState({bookmarkList:tempList});
  }


  handleUnlike(event,data,item){
    this.removeItemFromList(item);
    switch(data.type){
      case "room":{
        var request = new Request('https://www.trypinn.com/bookmark/api/unlike/', {
          method: 'POST',
          body: JSON.stringify({
            room_id : data.id,
        }),
          headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
          'Authorization': 'Token '+this.state.token,})
        });
        fetch(request)
        .then((response) => {
          return response.json();
        })
        .then((unlikeResponse) => {
          if(unlikeResponse.successful===true){
            // this.getBookmarkListFromServer();
          }
        });
        break;
      }
      case "ecotourism":{
        var request = new Request('https://www.trypinn.com/bookmark/api/unlike/', {
          method: 'POST',
          body: JSON.stringify({
            eco_room_id : data.id,
        }),
          headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
          'Authorization': 'Token '+this.state.token,})
        });
        fetch(request)
        .then((response) => {
          return response.json();
        })
        .then((unlikeResponse) => {
          // console.log(unlikeResponse);
          if(unlikeResponse.successful===true){
            // this.getBookmarkListFromServer();
          }
        });
        break;
      }
    }
  }
  renderRelevantPanel(){
    if(this.state.selectedPanel==="edit-profile"){
      return(
        <div className="user-profile-edit-main-division">
        <div className="user-profile-edit-secondary-heading`">
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
        <hr className="user-profile-edit-divider"/>
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
    if(this.state.selectedPanel==="bookmark-list"){
      if(this.state.bookmarkList!==null){
        if(this.state.bookmarkList.length!==0){
          return(
            <div className="bookmark-list-main-division">
              {this.renderBookmarkList()}
            </div>
          );
        }
        else{
          return(
            <div className="bookmark-list-empty-icon">
              <img className="no-bookmark-icon" src={require("../Images/nobookmark.png")} alt="" />
              <p className="no-bookmark-description"> لیست علاقه‌مندی های شما خالی است</p>
            </div>
          );
        }
      }
    }
  }
    getRoomType(data){
      switch(data.room_type){
        case "HOUSE":
          return 'خانه';
        case "SUITE":
          return 'سوییت';
        case "VILLA":
          return 'ویلای';
        case "APT":
          return 'آپارتمان';
        default:
          return null;
      }
    }
    getServiceType(data){
      switch(data.service_type){
        case "ENTIRE_HOME":
          return ' دربست ';
        case "PRIVATE_ROOM":
          return ' اتاق اختصاصی';
        case "SHARED_ROOM":
          return ' اتاق مشترک';
        default :
          return null;
      }
    }
    renderRelevantRoom(data){
      switch(data.type){
        case 'room':{
          return(
              <p className="bookmark-item-type"> {this.getRoomType(data)} {this.getServiceType(data)}</p>
          );
        }
        case 'ecotourism':{
          return(
              <p className="bookmark-item-type"> اقامتگاه بوم‌گردی</p>
          );
        }
      }
    }
  renderBookmarkList(){
    var list =this.state.bookmarkList.map((item)=>{
      if(item.room===null){
        var data = item.eco_room;
      }
      else{
        var data = item.room;
      }
      return(
        <div key={data.id}>
          <div className="bookmark-item">
            <div className="bookmark-item-data">
            <img src={"https://www.trypinn.com"+data.preview} alt={data.title} className="bookmark-item-preview"/>
            <div className="bookmark-item-description">
              <a href={"/"+ (data.type==="room"?"rooms/":"ecotourism/") + data.id } target="_blank" className = "bookmark-item-link">
                <p className="bookmark-item-title">
                  {data.title}
                </p>
              </a>
              {this.renderRelevantRoom(data)}
              <p className="bookmark-item-type">
                {data.address}
              </p>
              <div className="bookmark-item-bottom-section">
              <p onClick={(event)=>{this.handleUnlike(event,data,item)}} className="bookmark-item-delete-button">
                حذف از لیست
              </p>
              <p className="bookmark-item-price-details">
              <span className="bookmark-item-price">
                 {englishToPersianDigits(parsePrice3digits(data.price))} تومان
              </span>
              <span className="bookmark-item-price-description">
                / هر شب عادی
              </span>
              </p>
              </div>
            </div>
            </div>
          </div>
          <hr className="bookmark-item-divider"/>
        </div>
      );
    }
  );
  return(
    <ScrollArea smoothScrolling={false} stopScrollPropagation={true} speed={1} className="bookmark-list-container" horizontal={false}>
      {list}
    </ScrollArea>
  );

  }
  renderUserProfileEditSectionVersion2(){
    return(
      <div className={this.state.selectedPanel==='edit-profile'?"user-panel-section-edit-profile-version-md":"user-panel-section-bookmark-version-md"}>
        <div className="user-panel-section-header">
          <div onClick={()=>{this.setState({selectedPanel:"bookmark-list"});this.getBookmarkListFromServer()}} className={this.state.selectedPanel==="bookmark-list"? "user-panel-section-header-button-selected":"user-panel-section-header-button"}>
            <p className="user-panel-section-header-title">
              لیست علاقه‌مندی‌ها
            </p>
          </div>
          <div className="user-panel-section-vertical-line"></div>
          <div onClick={()=>{this.setState({selectedPanel:"edit-profile"})}} className={this.state.selectedPanel==="edit-profile"? "user-panel-section-header-button-selected":"user-panel-section-header-button"}>
            <p className="user-panel-section-header-title">
              ویرایش پروفایل
            </p>
          </div>
        </div>
        {this.renderRelevantPanel()}
      </div>
    );
  }
  render(){
    return(
      <div className="user-profile-main-division">
        <MetaTags>
          <meta name="description" content="noindex"/>
          <title> تریپین | حساب کاربری من</title>
        </MetaTags>
        {this.renderUploadPhotoModal()}
        {this.renderUserProfileDetailsSection()}
        {this.renderUserProfileEditSectionVersion2()}
        {this.renderPassConfirmationModal()}
        {this.renderEditConfirmationModal()}
      </div>
    );
  }
}

export default UserProfileMd;
