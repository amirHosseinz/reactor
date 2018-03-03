import React from 'react';
import {englishToPersianDigits} from '../../tools/EnglishToPersianDigits';
import {parsePrice3digits} from '../../tools/ParsePrice3digits.js';

class DifferentPricesMd extends React.Component{
  render(){
    // console.log(this.props.homeData);
    return(
      <div className="house-details-different-prices">
        <div className="house-details-different-prices-section">
          <p className="house-details-different-prices-title">
            عادی
          </p>
          <p>
            <span className="house-details-different-prices-value">{englishToPersianDigits(parsePrice3digits(this.props.homeData.price))} </span> <span className="house-details-different-prices-currency"> تومان</span>
          </p>
        </div>
        <div className="vertical-line"></div>
        <div className="house-details-different-prices-section">
        <p className="house-details-different-prices-title">
          آخر هفته
        </p>
        <p>
          <span className="house-details-different-prices-value">{englishToPersianDigits(parsePrice3digits(this.props.homeData.weekend_price))}  </span> <span className="house-details-different-prices-currency"> تومان</span>
        </p>
        </div>
        <div className="vertical-line"></div>
        <div className="house-details-different-prices-section">
        <p className="house-details-different-prices-title">
          ایام خاص
        </p>
        <p>
          <span className="house-details-different-prices-value"> {englishToPersianDigits(parsePrice3digits(this.props.homeData.special_offer_price))} </span> <span className="house-details-different-prices-currency"> تومان</span>
        </p>
        </div>
      </div>
    );
  }
}

export default DifferentPricesMd;
