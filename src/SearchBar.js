import React from 'react';
import SearchResult from './SearchResult';
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015
import { Button} from 'semantic-ui-react';
import {findDOMNode} from 'react-dom';
import $ from 'jquery';
import './tools/DatePicker/bootstrap-datepicker.fa.js';
import './tools/DatePicker/bootstrap-datepicker.js';
import './tools/DatePicker/bootstrap-datepicker.css';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      showOnlyCitySearchBar:true,
      houseList:[],
      searchParams : {
        location: null,
        start_date: null,
        end_date: null,
        capacity: null,
      },
    };
  }
  getRelevantToken(){
    return localStorage['token'];
  }
  componentWillMount(){

    this.setState({
      token : this.getRelevantToken(),
    }, () => {
    });
  }

  renderData(houseData) {
   this.setState({
     houseList: houseData.room,
   });
  }
  renderRelevantSearchBar(){
    if (this.state.showOnlyCitySearchBar ===true){
      return (
        <div className='only-city-search-bar row'>
          <div className="free-zone col-md-3"></div>
          <div className="main-zone col-md-6">
            <div className="row">
            <div className="xxxz col-md-2"></div>
            <div className="xxx col-md-8">
              <div className="seach-top-slogan-container">
                <img src="  http://image.ibb.co/miywub/trypinn_suitcase.png" className='suitcase-image' alt=""></img>
                <div className="slogan-container">
                  <p className='slogan-1' >!سفرت رو شیرین‌تر کن</p>
                  <p className='slogan-2' >!اجاره اقامتگاه و ویلا از همیشه آسون‌تر شده</p>
                </div>
              </div>
            </div>
            <div className="xxxz col-md-2"></div>
            </div>
              <div className="searchbar-zone">
                <Typeahead
                  className='typehead'
                  onChange={(selected) => {
                  // Handle selections...
                  }}
                  options={[
                    'مازندران',
                    'شمال',
                    'رشت',
                    'نوشهر',
                    'اصفهان',
                    'کاشان',
                    'بابلسر',
                    'سلمان‌شهر (متل قو)',
                   ]}
                  align="right"
                  delay='100'
                  bsSize='lg'
                  emptyLabel='.مقصدی یافت  نشد'
                  placeholder='مثلاً: بابلسر'
                  minLength={1}
                  maxResults={3}
                  paginationText='نمایش نتایج بیشتر'
                  submitFormOnEnter={false}
                  selectHintOnEnter={true}
                />
                <Button color='blue' className="search-btn btn"  onClick={this.handleClick.bind(this)} data-reactid="99">
                  <span className='searchicon'>
                    <img src="http://image.ibb.co/fjdMQG/trpinn_search.png" className='search-image' alt=""></img>
                  </span>
                </Button>
              </div>
          </div>
          <div className="free-zone col-md-3"></div>
        </div>
      );
    }
    else{
      return (
        <div className="render-results row">
              <div className="results-search">
                <div className="results-serach-child">
                  <div className="col-md-3">
                  </div>
                  <div className="search-inputs col-md-9">
                    <div className="multi-input-1 col-md-2">
                    <Typeahead
                      className='typehead-results'
                      onChange={(selected) => {
                      // Handle selections...
                      }}
                      options={[
                        'مازندران',
                        'شمال',
                        'رشت',
                        'نوشهر',
                        'اصفهان',
                        'کاشان',
                        'بابلسر',
                        'سلمان‌شهر (متل قو)',
                       ]}
                      align="right"
                      delay='100'
                      bsSize='lg'
                      emptyLabel='.مقصدی یافت  نشد'
                      placeholder='مثلاً: بابلسر'
                      minLength='1'
                      maxResults='3'
                      paginationText='نمایش نتایج بیشتر'
                      submitFormOnEnter='false'
                      selectHintOnEnter='true'
                    />
                    </div>
                    <div className="multi-input-1 col-md-2">
                    </div>
                    <div className="multi-input-1 col-md-2">
                    </div>
                    <div className="multi-input-1 col-md-2">
                    </div>
                    <div className="multi-input-2 col-md-1">
                    </div>
                    <div className="col-md-6">
                    </div>
                  </div>
                </div>
              </div>
            <div className="render-houses-row">
              {this.renderHouses()}
            </div>
        </div>
      );
    }
  }
  renderHouses () {
    var results = [];
    var initList = this.state.houseList.map((houseItem) => {
      return(
        <div className="col-md-2"
         key = {houseItem.id}>
         <SearchResult
          room = {houseItem}
          preview ={"https://www.trypinn.com" + houseItem.preview}/>
        </div>
      );
    });
    var counter = 0;
    var listOfFive = [];
    initList.map((item) => {
      counter++;
      if (counter===1) {
        listOfFive.push(
          <div className="full-width col-md-1">
          </div>
        );
      }
      listOfFive.push(item);
      if (counter===5) {
        counter = 0;
        results.push(
          <div className="row">
          {listOfFive}
          </div>
        );
        listOfFive = [];
      }
    });
    return results;
  }

  setToken() {
    this.setState({
      token: localStorage['token'],});
  }
  setSearchParams(){
    var spar = {
      location: '',
      start_date: new Date(),
      end_date: new Date(),
      capacity: 1,
    };
    this.setState({
      searchParams: spar
    }, () => {
    this.getDataFromServer();
    });
  }
  getDataFromServer(){
    var request = new Request('https://www.trypinn.com/api/search/',{
      method: 'POST',
      body: JSON.stringify({
        location: this.state.searchParams.location,
        start_date: this.state.searchParams.start_date,
        end_date: this.state.searchParams.end_date,
        capacity: this.state.searchParams.capacity,
    }),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((homeData) => {
     this.renderData(homeData);
   });
  }
   handleClick(){
     this.setState({showOnlyCitySearchBar : false} , ()=> {this.setSearchParams()});
   }
   renderFromDatePicker(){
     const fromDatePicker = findDOMNode(this.refs.fromdatepicker);
     $(document).ready(function(){
       $(fromDatePicker).datepicker({
         changeMonth: true,
         changeYear: true,
         isRTL: true,
         dateFormat: "yy/m/d",
        });
     });
   }
   renderToDatePicker(){
     const toDatePicker = findDOMNode(this.refs.todatepicker);
     $(document).ready(function(){
       $(toDatePicker).datepicker({
         changeMonth: true,
         changeYear: true,
         isRTL: true,
         dateFormat: "yy/m/d",
        });
     });
   }
  render(){
    return (
      <div>
          <div className="container-fluid hidden-xs visible-xl">
          {this.renderRelevantSearchBar()}
          <div className="col-lg col-sm-12 mb-10">
            <div className="control-group">
              <div className="controls">
                <div className="input-append">
                  <input ref="fromdatepicker"
                         className="form-control transparent-input"
                         name="start_date"
                         type="text"
                         placeholder="از؟"
                         style={{width:500}}
                         onClick = {this.renderFromDatePicker.bind(this)}/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg col-sm-12 mb-10">
            <div className="control-group">
              <div className="controls">
                <div className="input-append">
                  <input ref="todatepicker"
                         className="form-control transparent-input"
                         name="end_date"
                         type="text"
                         placeholder="تا"
                         style={{width:500}}
                         onClick={this.renderToDatePicker.bind(this)}/>
                </div>
              </div>
            </div>
          </div>

          </div>
          <div className="container-fluid hidden-xl visible-xs">
              <div className='row'>
                <div className="main-zone-xs col-md-12">
                  <div className="row">
                    <div className="seach-top-slogan-xs-container">
                        <p className='slogan-xs'>.مقصد خود برای رزرو اقامتگاه را جستجو کنید</p>
                        <p className='slogan-xs'></p>
                    </div>
                  </div>
                    <div className="searchbar-zone-mobile">
                      <Typeahead
                        className='typehead-mobile'
                        onChange={(selected) => {
                        // Handle selections...
                        }}
                        options={[
                          'مازندران',
                          'شمال',
                          'رشت',
                          'نوشهر',
                          'اصفهان',
                          'کاشان',
                          'متل قو',
                          'بابلسر',
                          'سلمان‌شهر (متل قو)',
                        ]}
                        align="right"
                        delay='100'
                        bsSize='sm'
                        emptyLabel='.موردی یافت نشد'
                      />
                      <Button color='blue' className="search-btn-xs "  onClick={this.handleClick.bind(this)} data-reactid="99">
                        <span className='searchicon'>
                          <img src="http://image.ibb.co/fjdMQG/trpinn_search.png" className='search-image-xs' alt=""></img>
                        </span>
                      </Button>
                    </div>
                </div>
              </div>
            {this.renderHouses()}
          </div>
      </div>
    );
  }
}
export default SearchBar;
