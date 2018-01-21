import React from 'react';

class Suggestions extends React.Component{
  render(){
    return(
      <div className="suggestions-comments-section">
        <p className='suggestions-comments-header'>شکایات
        </p>
        <p className='suggestions-comments-paragraph'>
        تریپین همواره آماده است تا انتقادات، پیشنهادات و شکایات شما را از طریق ایمیل شرکت به نشانی
        support@tripinn.ir
        و شماره تلفن 02188573037 دریافت کند.
        </p>
        <p className='suggestions-comments-paragraph'>
          ما در تریپین تمام تلاش خود را به کار خواهیم بست تا به بهترین شکل پیگیر درخواست‌های شما کاربران گرامی باشیم
        </p>
      </div>
    );
  }
}

export default Suggestions;
