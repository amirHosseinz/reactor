import React from 'react';
import { Divider,Button } from 'semantic-ui-react';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits';
import moment from 'moment-jalaali';

moment.loadPersian({usePersianDigits:true , dialect:'persian-modern'});
class TripItemXs extends React.Component{
  render(){
    return (
      <div>
      </div>
    );
  }
}

export default TripItemXs;
