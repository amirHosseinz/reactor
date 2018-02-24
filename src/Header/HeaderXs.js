import React from 'react';
import { slide as Menu} from 'react-burger-menu';
import customBurgerIcon  from 'react-burger-menu';
import {Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
class HeaderXs extends React.Component{
  handleLoginButtonXs(){
    this.setState({showBurgerMenu:false, showMobileLoginPanel:true});
  }

  renderLoginButtonXs(){
    if (this.state.isLoggedIn !== 'true'){
      return(
          <p className="clickable-p" onClick={this.handleLoginButtonXs.bind(this)}>ورود / ثبت‌نام</p>
      );
    }
  }
  renderSignOutAndProfileButtonXs(){
    if (localStorage['isLoggedIn']==='true'){
      return(
        <div>
          <p className="menu-item" onClick={this.handleUserProfileClick.bind(this)}> حساب کاربری </p>
          <p className="menu-item" onClick={this.handleSignOutButton.bind(this)}> خروج</p>
        </div>
      );
    }
  }

  toggleBurgerMenu(){
    this.setState({showBurgerMenu:true});
  }



  // renderHeaderXs(){
  //   return(
  //     <div className='header hidden-xl visible-xs navbar-fixed-top'>
  //       <div className='headermobile'>
  //            <img src={require('../Images/tripinn_logo.svg')}  className="LogoImage-mobile" alt="تریپین"></img>
  //       </div>
  //       <div className="burger-menu" >
  //           <div className="burger-in-div" dir="rtl">
  //             <div className="burger-item">
  //              <a id="home" className="menu-item" href="http://tripinn.ir">خانه</a>
  //              {this.renderSignOutAndProfileButtonXs()}
  //             </div>
  //             <div className="burger-item">
  //              {this.renderLoginButtonXs()}
  //             </div>
  //           </div>
  //          </Menu>
  //          <Modal show={this.state.showMobileLoginPanel}
  //          className='phone-number-modal-xs'
  //          onHide={()=>{this.setState({showMobileLoginPanel:false})}}>
  //           <div>
  //           <div className="login1-modal">
  //             <p className="login-title-in-modal"> ورود/ عضویت </p>
  //             <p className="enter-phone-number-inmodal"> برای ورود یا ثبت‌نام شماره تلفن همراه خود را وارد کنید :</p>
  //               <div dir="rtl" className="enter-number-main">
  //                 <input
  //                   id="tel-number"
  //                   autoComplete="off"
  //                   autoFocus={true}
  //                   className="login-input"
  //                   placeholder="مثال: ۰۹۱۲۰۰۰۰۰۰۰"
  //                   onKeyDown={(event)=>{this.getUserHasPasswordByEnter(event)}}
  //                   type="number"
  //                   />
  //                   <div className="divider-x"></div>
  //                   <br/>
  //                   <br/>
  //                   <Button color="blue" onClick = {this.getUserHasPassword.bind(this)} className="login-modal-button">
  //                   ورود / ثبت‌نام
  //                   </Button>
  //               </div>
  //             </div>
  //           </div>
  //          </Modal>
  //       </div>
  //     </div>
  //   );
  // }
          // {this.renderHeaderXs()}
    renderHeader(){
      return(
        <div className="header-main-division-xs">
            <div className="header-logo-xs">
              <Link to="/">
                <img height='50px' width="50px" src={require('../Images/tripinn_logo.svg')} alt = 'تریپین'/>
              </Link>
            </div>
            <div className="header-burger-menu-xs">
            </div>
        </div>
      );
    }
  render(){
    return(
      <div>
        {this.renderHeader()}
      </div>
    );
  }
}

export default HeaderXs;
