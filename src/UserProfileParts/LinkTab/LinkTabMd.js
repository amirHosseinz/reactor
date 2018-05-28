import React from 'react';
import {Link} from 'react-router-dom';


class LinkTabMd extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedTab :this.readTabFromURL(),
    }
  }

  readTabFromURL(){
    // console.log(window.location.pathname.split('/')[window.location.pathname.split('/').length-1]);
    switch (window.location.pathname.split('/')[window.location.pathname.split('/').length-1]){
      case "editprofile":{
        return "edit-profile";
      }
      case "editpassword":{
        return "edit-password";
      }
      case "bookmarklist":{
        return "bookmark-list";
      }
      case "financeaccount":{
        return "finance-account";
      }
    }
  }
  renderLinkList(){
    return (
      <div className="link-tab-list-of-links">
        <Link to="/profile/editprofile" onClick={()=>{this.setState({selectedTab:"edit-profile"})}} className={this.state.selectedTab==="edit-profile"? "link-tab-item-selected":"link-tab-item"}>
          <img src={require("./edit_profile.svg")} className="link-tab-item-icon" />
          <div className="link-tab-item-anchor">
            <p className="link-tab-item-text">
              ویرایش مشخصات
            </p>
          </div>
        </Link>
        <hr className="link-tab-item-divider"/>
        <Link to="/profile/editpassword" onClick={()=>{this.setState({selectedTab:"edit-password"})}} className={this.state.selectedTab==="edit-password"? "link-tab-item-selected":"link-tab-item"}>
          <img src={require("./change_password.svg")} className="link-tab-item-icon" />
          <div className="link-tab-item-anchor">
            <p className="link-tab-item-text">
              تغییر رمز عبور
            </p>
          </div>
        </Link>
        <hr className="link-tab-item-divider"/>
        <Link to="/profile/bookmarklist" onClick={()=>{this.setState({selectedTab:"bookmark-list"})}} className={this.state.selectedTab==="bookmark-list"? "link-tab-item-selected":"link-tab-item"}>
          <img src={require("./bookmark.svg")} className="link-tab-item-icon" />
          <div className="link-tab-item-anchor">
            <p className="link-tab-item-text">
              لیست مورد علاقه‌ها
            </p>
          </div>
        </Link>
        <hr className="link-tab-item-divider"/>
        <Link to="/profile/financeaccount" onClick={()=>{this.setState({selectedTab:"finance-account"})}} className={this.state.selectedTab==="finance-account"? "link-tab-item-selected":"link-tab-item"}>
          <img src={require("./wallet.svg")} className="link-tab-item-icon" />
          <div className="link-tab-item-anchor">
            <p className="link-tab-item-text">
              کیف پول
            </p>
          </div>
        </Link>
      </div>
    );
  }
  render() {
    return(
      <div className="link-tab-main-division">
        {this.renderLinkList()}
      </div>
    );
  }
}

export default LinkTabMd
