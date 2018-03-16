import React from 'react';
import './Styles/404page.css';
import {Link} from 'react-router-dom';

class Error404Page extends React.Component{
  render(){
    return(
      <div className="error-404-page">
        <img className="error-404-image" src={require("./Images/404.png")} alt="404 page error"/>
        <p className="error-404-description"> !متأسفانه صفحه مورد نظر شما یافت نشد</p>
        <Link className="error-404-page-link" to="/" >
          <div className="return-to-home-page-button">
            بازگشت به صفحه اصلی
          </div>
        </Link>
      </div>
    );
  }
}

export default Error404Page
