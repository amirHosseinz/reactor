import React from 'react';
class Facilities extends React.Component {

  renderRefrig () {
    if (this.props.utility.indexOf('FRIDGE') > -1) {
      return(

        <div>
          یخچال فریزر
          </div>

      );
    }
  }

  renderParking () {
    if (this.props.utility.indexOf('PARKING') > -1) {
      return(
        <div>
            پارکینگ
          </div>
      );
    }
  }

  renderBarbecue () {
    if (this.props.utility.indexOf('BARBECUE') > -1) {
      return(
        <div>

          باربیکیو
        </div>
      );
    }
  }

  renderBlanket () {
    if (this.props.utility.indexOf('EXTRA_SLEEP_UTILS') > -1) {
      return(
        <div>

            پتو و بالش اضافه
        </div>
      );
    }
  }


  renderCanape () {
    if (this.props.utility.indexOf('SOFA') > -1) {
      return(
        <div>
        مبلمان
        </div>
      );
    }
  }
  renderDinnerTable () {
    if (this.props.utility.indexOf('DINING_TABLE') > -1) {
      return(
        <div>
میز ناهارخوری
        </div>
      );
    }
  }

  renderConditioner () {
    if (this.props.utility.indexOf('COOLER') > -1) {
      return(
        <div>
            کولر
        </div>
      );
    }
  }

  renderElevator () {
    if (this.props.utility.indexOf('ELEVATOR') > -1) {
      return(
        <div>
            آسانسور
        </div>
      );
    }
  }

  renderFoosball () {
    if (this.props.utility.indexOf('TABLE_FOOTBALL') > -1) {
      return(
        <div>
فوتبال دستی
        </div>
      );
    }
  }

  renderHanger () {
    if (this.props.utility.indexOf('HANGER') > -1) {
      return(
        <div>
چوب لباسی
        </div>
      );
    }
  }

  renderHeater () {
    if (this.props.utility.indexOf('HEATER') > -1) {
      return(
        <div>
بخاری - شوفاژ
        </div>
      );
    }
  }

  renderKitchenware () {
    if (this.props.utility.indexOf('KITCHEN_DISH') > -1) {
      return(
        <div>
            ظروف آشپزخانه
        </div>
      );
    }
  }

  renderMicrowave () {
    if (this.props.utility.indexOf('MICROWAVE_OVEN') > -1) {
      return(
        <div>
ماکروویو
        </div>
      );
    }
  }

  renderPavilion () {
    if (this.props.utility.indexOf('PERGOLA') > -1) {
      return(
        <div>
            آلاچیق
        </div>
      );
    }
  }

  renderPingpong () {
    if (this.props.utility.indexOf('PING_PONG') > -1) {
      return(
        <div>
          میز پینگ پنگ
        </div>
      );
    }
  }

  renderPool () {
    if (this.props.utility.indexOf('POOL') > -1) {
      return(
        <div>
            استخر
 </div>
      );
    }
  }

  renderStove () {
    if (this.props.utility.indexOf('OVEN') > -1) {
      return(
        <div>

          اجاق گاز
        </div>
      );
    }
  }

  renderTeamaker () {
    if (this.props.utility.indexOf('TEA_MAKER') > -1) {
      return(
        <div>
چای ساز
        </div>
      );
    }
  }

  renderTv () {
    if (this.props.utility.indexOf('TV') > -1) {
      return(
       <div>
تلویزیون
        </div>
      );
    }
  }

  renderForeigntoilet () {
    if (this.props.utility.indexOf('FOREIGN_TOILET') > -1) {
      return(
        <div>
توالت فرنگی
        </div>
      );
    }
  }

  renderWifi () {
    if (this.props.utility.indexOf('NET') > -1) {
      return(
        <div>

            اینترنت بیسیم

        </div>
      );
    }
  }




  render () {
    return(
          <div>
            {this.renderRefrig()}
            {this.renderParking()}
            {this.renderBarbecue()}
            {this.renderBlanket()}
            {this.renderCanape()}
            {this.renderConditioner()}
            {this.renderDinnerTable()}
            {this.renderElevator()}
            {this.renderFoosball()}
            {this.renderHanger()}
            {this.renderHeater()}
            {this.renderKitchenware()}
            {this.renderMicrowave()}
            {this.renderPavilion()}
            {this.renderPingpong()}
            {this.renderPool()}
            {this.renderStove()}
            {this.renderTeamaker()}
            {this.renderTv()}
            {this.renderForeigntoilet()}


          </div>
    );
  }
}
export default Facilities;
