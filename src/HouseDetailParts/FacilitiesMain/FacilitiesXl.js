import React from 'react';
class Facilities extends React.Component {

  renderRefrig () {
    if (this.props.utility.indexOf('FRIDGE') > -1) {
      return(

        <div className="house-details-facilities-item">
          <img src={require('../facilities/refrigerator.png')}   className="house-details-facilities-other-amanities-icon" alt = "" />
          <p className="house-details-facility-text">یخچال فریزر</p>
        </div>

      );
    }
  }

  renderParking () {
    if (this.props.utility.indexOf('PARKING') > -1) {
      return(
        <div className="house-details-facilities-item">
          <img src={require('../facilities/parking.png')} className="house-details-facilities-other-amanities-icon" alt = "" />
          <p className="house-details-facility-text">  پارکینگ </p>
          </div>
      );
    }
  }

  renderBarbecue () {
    if (this.props.utility.indexOf('BARBECUE') > -1) {
      return(
        <div className="house-details-facilities-item">
        <img src={require('../facilities/Barbecue.png')}   className="house-details-facilities-other-amanities-icon" alt = "" />
        <p className="house-details-facility-text">باربیکیو </p>
        </div>
      );
    }
  }

  renderBlanket () {
    if (this.props.utility.indexOf('EXTRA_SLEEP_UTILS') > -1) {
      return(
        <div className="house-details-facilities-item">
          <img src={require('../facilities/blanket.png')}   className="house-details-facilities-other-amanities-icon" alt = "" />
          <p className="house-details-facility-text">پتو و بالش اضافه</p>
        </div>
      );
    }
  }


  renderCanape () {
    if (this.props.utility.indexOf('SOFA') > -1) {
      return(
        <div className="house-details-facilities-item">
          <img src={require('../facilities/canape.png')}  className="house-details-facilities-other-amanities-icon" alt = "" />
          <p className="house-details-facility-text">مبلمان </p>
        </div>
      );
    }
  }
  renderDinnerTable () {
    if (this.props.utility.indexOf('DINING_TABLE') > -1) {
      return(
        <div className="house-details-facilities-item">
        <img src={require('../facilities/dinnertable.png')}    className="house-details-facilities-other-amanities-icon" alt = "" />
        <p className="house-details-facility-text">  میز ناهارخوری </p>
        </div>
      );
    }
  }

  renderConditioner () {
    if (this.props.utility.indexOf('COOLER') > -1) {
      return(
        <div className="house-details-facilities-item">
          <img src={require('../facilities/conditioner.png')}   className="house-details-facilities-other-amanities-icon" alt = "" />
          <p className="house-details-facility-text"> کولر </p>
        </div>
      );
    }
  }

  renderElevator () {
    if (this.props.utility.indexOf('ELEVATOR') > -1) {
      return(
        <div className="house-details-facilities-item">
          <img src={require('../facilities/elevator.png')}  className="house-details-facilities-other-amanities-icon" alt = "" />
          <p className="house-details-facility-text">  آسانسور </p>
        </div>
      );
    }
  }

  renderFoosball () {
    if (this.props.utility.indexOf('TABLE_FOOTBALL') > -1) {
      return(
        <div className="house-details-facilities-item">
          <img src={require('../facilities/foosball.png')}   className="house-details-facilities-other-amanities-icon" alt = "" />
          <p className="house-details-facility-text">فوتبال دستی </p>
        </div>
      );
    }
  }

  renderHanger () {
    if (this.props.utility.indexOf('HANGER') > -1) {
      return(
        <div className="house-details-facilities-item">
          <img src={require('../facilities/hanger.png')}   className="house-details-facilities-other-amanities-icon" alt = "" />
          <p className="house-details-facility-text">  چوب لباسی </p>
        </div>
      );
    }
  }

  renderHeater () {
    if (this.props.utility.indexOf('HEATER') > -1) {
      return(
        <div className="house-details-facilities-item">
          <img src={require('../facilities/heater.png')}  className="house-details-facilities-other-amanities-icon" alt = "" />
          <p className="house-details-facility-text">شوفاژ </p>
        </div>
      );
    }
  }

  renderKitchenware () {
    if (this.props.utility.indexOf('KITCHEN_DISH') > -1) {
      return(
        <div className="house-details-facilities-item">
          <img src={require('../facilities/kitchenware.png')}   className="house-details-facilities-other-amanities-icon" alt = "" />
          <p className="house-details-facility-text"> ظروف آشپزخانه </p>
        </div>
      );
    }
  }

  renderMicrowave () {
    if (this.props.utility.indexOf('MICROWAVE_OVEN') > -1) {
      return(
        <div className="house-details-facilities-item">
          <img src={require('../facilities/mircowave.png')}   className="house-details-facilities-other-amanities-icon" alt = "" />
          <p className="house-details-facility-text">  ماکروویو </p>
        </div>
      );
    }
  }

  renderPavilion () {
    if (this.props.utility.indexOf('PERGOLA') > -1) {
      return(
        <div className="house-details-facilities-item">
          <img src={require('../facilities/pavilion.png')} className="house-details-facilities-other-amanities-icon" alt = "" />
          <p className="house-details-facility-text">    آلاچیق </p>
        </div>
      );
    }
  }

  renderPingpong () {
    if (this.props.utility.indexOf('PING_PONG') > -1) {
      return(
        <div className="house-details-facilities-item">
          <img src={require('../facilities/pingpong.png')}   className="house-details-facilities-other-amanities-icon" alt = "" />
          <p className="house-details-facility-text"> میز پینگ پنگ </p>
        </div>
      );
    }
  }

  renderPool () {
    if (this.props.utility.indexOf('POOL') > -1) {
      return(
        <div className="house-details-facilities-item">
        <img src={require('../facilities/pool.png')}   className="house-details-facilities-other-amanities-icon" alt = "" />

              <p className="house-details-facility-text"> استخر</p>
        </div>
      );
    }
  }

  renderStove () {
    if (this.props.utility.indexOf('OVEN') > -1) {
      return(
        <div className="house-details-facilities-item">
          <img src={require('../facilities/stove.png')}   className="house-details-facilities-other-amanities-icon" alt = "" />
          <p className="house-details-facility-text">
          اجاق گاز
          </p>
        </div>
      );
    }
  }

  renderTeamaker () {
    if (this.props.utility.indexOf('TEA_MAKER') > -1) {
      return(
        <div className="house-details-facilities-item">
        <img src={require('../facilities/teamaker.png')}   className="house-details-facilities-other-amanities-icon" alt = "" />

        <p className="house-details-facility-text">
        چای ساز
        </p>
        </div>
      );
    }
  }

  renderTv () {
    if (this.props.utility.indexOf('TV') > -1) {
      return(
      <div className="house-details-facilities-item">
       <img src={require('../facilities/tv.png')}  className="house-details-facilities-other-amanities-icon" alt = "" />

        <p className="house-details-facility-text">
تلویزیون
        </p>
        </div>
      );
    }
  }

  renderForeigntoilet () {
    if (this.props.utility.indexOf('FOREIGN_TOILET') > -1) {
      return(
        <div className="house-details-facilities-item">
        <img src={require('../facilities/wc-1.png')}   className="house-details-facilities-other-amanities-icon" alt = "" />
        <p className="house-details-facility-text">
        توالت فرنگی
        </p>
        </div>
      );
    }
  }

  renderWifi () {
    if (this.props.utility.indexOf('NET') > -1) {
      return(
        <div className="house-details-facilities-item">
          <img src={require('../facilities/wifi.png')}  className="house-details-facilities-other-amanities-icon" alt = "" />
          <p className="house-details-facility-text">
            اینترنت بیسیم
          </p>
        </div>
      );
    }
  }

  render () {
    return(

      <div className="row-reverse">
          {this.renderFoosball()}
          {this.renderBarbecue()}
          {this.renderHeater()}
          {this.renderBlanket()}
          {this.renderCanape()}
          {this.renderElevator()}
          {this.renderHanger()}
          {this.renderPavilion()}
          {this.renderTv()}
          {this.renderForeigntoilet()}
          {this.renderStove()}
          {this.renderKitchenware()}
          {this.renderRefrig()}
          {this.renderDinnerTable()}
          {this.renderMicrowave()}
          {this.renderTeamaker()}
          {this.renderConditioner()}
          {this.renderPingpong()}
          {this.renderPool()}
          {this.renderParking()}
          </div>
    );
  }
}
export default Facilities;
