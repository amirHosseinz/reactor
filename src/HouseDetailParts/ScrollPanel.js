import React from 'react';

class ScrollPanel extends React.Component{
  render(){
    return (
      <div>
          <div className='navigation-menu-housedetails'>
            <p className='navigation-menu-items'>مشخصات</p>
            <p className='navigation-menu-items'>تصاویر</p>
            <p className='navigation-menu-items'>امکانات و قوانین</p>
            <p className='navigation-menu-items'>موقعیت روی نقشه</p>
          </div>
      </div>
    );
  }
}

export default ScrollPanel;
