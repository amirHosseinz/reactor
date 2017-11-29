import React from 'react';
import HouseDetails from './HouseDetails';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      houseList: [],
      searchParams : {
        location: null,
        start_date: null,
        end_date: null,
        capacity: null,
      },
    };
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount()
  {
    this.setState({
      token: "2df579cfc86d929b9a9228bdcd265345addf8cb4",
    }, () => {
      // this.handleClick();
    });
  }

  renderData(houseData)
  {
    console.log(houseData)
   this.setState({
     houseList: houseData.room,
   });
  }

  renderHouses ()
  {
    return(this.state.houseList.map((houseItem) =>
      <HouseDetails key={houseItem.id} title={houseItem.title} price={houseItem.price} location={houseItem.address} image ={"https://www.trypinn.com" + houseItem.preview} />)
    );
  }
  setToken()
  {
    this.setState({
      token: "2df579cfc86d929b9a9228bdcd265345addf8cb4",});
  }
  setSearchParams()
  {
    var spar = {
      location: document.getElementById('location').value,
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
  getDataFromServer()
  {
    var request = new Request('https://www.trypinn.com/api/search/', {
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
   handleClick()
   {
     this.setSearchParams();
   }

  render()
  {
    return (
      <div>
        <div>
          {this.renderHouses()}
        </div>
        <div>
          <button onClick={this.handleClick}>
          search!!!
          </button>
        </div>
        <div>
        <input id = "location"/>
        </div>
        </div>
    );
  }
}

export default SearchBar;
