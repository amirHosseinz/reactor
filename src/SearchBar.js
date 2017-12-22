import React from 'react';
import SearchResult from './SearchResult';
//import { BrowserRouter,Route} from 'react-router-dom';
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015
import { Button} from 'semantic-ui-react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      showOnlyCitySearchBar:true,
      houseList: [],
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
  getTestTokenFromServer(){

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
                    <div className=" col-md-6">
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
    var counter = -1;
    return(this.state.houseList.map((houseItem) => {
      counter++;
      if (counter%5===0) {
        return(
            <div className="mamadx col-md-2 col-md-offset-1"
             key = {houseItem.id}>
             <SearchResult
              room = {houseItem}
              preview ={"https://www.trypinn.com" + houseItem.preview}/>
            </div>
        );
      } else {
        return(
            <div className="mamadx col-md-2 col-md-offset-1"
             key = {houseItem.id}>
             <SearchResult
              room = {houseItem}
              preview ={"https://www.trypinn.com" + houseItem.preview}/>
            </div>
        );
      }
    }));
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

  render() {
    return (
      <div>
          <div className="container-fluid hidden-xs visible-xl">
          {this.renderRelevantSearchBar()}
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
            <div className="row">
              {this.renderHouses()}
            </div>
          </div>
      </div>
    );
  }
}
export default SearchBar;
