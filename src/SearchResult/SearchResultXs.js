import React from 'react';
import { findDOMNode } from 'react-dom';
import { Button } from 'semantic-ui-react';
import { Typeahead ,MenuItem,Menu , menuItemContainer} from '../tools/react-bootstrap-typeahead';
import SearchResultItem from '../SearchResultItem';
import { withRouter } from 'react-router-dom';
const listOfCity = [
  'اصفهان',
  'نوشهر',
  'گیلان',
  'رامسر',
  'کیش',
  'مازندران',
  'بابلسر',
  'فریدون‌کنار',
  'محمودآباد',
  'عباس‌آباد',
  'شاندیز',
  'خراسان رضوی',
  'بندر انزلی',
  'کاشان',
  'باغ‌بهادران',
  'قلعه‌رودخان',
  'مشهد',
  'چمخاله',
  'فومن',
  'رضوان‌شهر',
  'رودسر',
  'آستارا',
  'زیباکنار',
  'سرخ‌رود',
  'رویان',
  'نور',
  'چالوس',
  'تنکابن',
  'دریاکنار',
  'ایزدشهر',
  'کلاردشت',
  'کلارآباد',
  'سلمان‌شهر',
  'نشتارود',
  'البرز',
];

class SearchResultXs extends React.Component{

  renderSearchBarInDetailsXs(){
     return(
       <div className="serachbar-indetail-xs">
         <Typeahead
           className="typeahead-indetail-sm "
           minLength={2}
           align="right"
           emptyLabel="نتیجه‌ای یافت نشد"
           maxResults={5}
           onKeyDown={(event)=>{this.handleSearchByEnter(event)}}
           selectHintOnEnter={false}
           highlightOnlyResult={true}
           submitFormOnEnter={true}
           selected={[localStorage['selected-city-search']]}
           onInputChange={(input)=> { this.setState({city:input})}}
           onChange={(selected)=>{
             if(selected.length!==0){
               this.setState({city:selected[0]},()=>{this.handleClickXs()});
             }
           }}
           options={listOfCity}
           />
         <input className="date-picker-input form-control1" id='fromdatepicker' ref='fromdatepicker' placeholder='تاریخ ورود'style={{direction:'rtl',textAlign:'center'}}/>
         <input className="date-picker-input form-control1" id='todatepicker' ref='todatepicker' placeholder='تاریخ خروج'style={{direction:'rtl',textAlign:'center'}}/>
         <div className="guestholder-xs" dir="rtl">
          <select className="form-control1" id="sel1">
            <option>1 مهمان</option>
            <option>2 مهمان</option>
            <option>3 مهمان </option>
            <option>4 مهمان</option>
            <option>5 مهمان</option>
            <option>6 مهمان</option>
            <option>7 مهمان </option>
            <option>8 مهمان</option>
            <option>9 مهمان</option>
            <option>10 مهمان و بیشتر</option>
          </select>
          </div>
          <Button color='blue' className="search-btn-result-xs"  onClick={this.handleClickXs.bind(this)} data-reactid="99">
            <span className='searchicon'>
              <img src={require('../Images/trpinn_search.png')} className='search-image-result-xs' alt=""></img>
            </span>
          </Button>
       </div>
     );
  }

  handleClickXs(){
     if(this.state.showOnlyCitySearchBarMobile===true){
       localStorage['selected-city-search']=this.state.city;
     }
     this.setState({showOnlyCitySearchBarMobile:false},()=>{this.setSearchParams()});
  }

  renderHousesCol1 () {
    var results = [];
    var initList = this.state.houseList.map((houseItem) => {
      return(
        <div className="pre-img-result full-width"
         key = {houseItem.id}>
         <SearchResultItem
          room = {houseItem}
          preview ={"https://www.trypinn.com" + houseItem.preview} />
        </div>
      );
    });
    var counter = 0;
    var listOfOne = [];
    initList.map((item) => {
      counter++;
      listOfOne.push(item);
      if (counter===1) {
        counter = 0;
        results.push(
          <div className="row">
          {listOfOne}
          </div>
        );
        listOfOne = [];
      }
    });
    if (listOfOne.length > 0) {
      results.push(
        <div className="row">
        {listOfOne}
        </div>
      );
    }
    return results;
  }

    // {this.renderSearchBarInDetailsXs()}
    // {this.renderHousesCol1()}
  render(){
    return(
      <div>
      </div>
    );
  }
}

export default SearchResultXs;
