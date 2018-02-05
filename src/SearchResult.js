import React from 'react';
import SearchResultXl from './SearchResult/SearchResultXl';
import SearchResultXs from './SearchResult/SearchResultXs';
import SearchResultMd from './SearchResult/SearchResultMd';
import SearchResultSm from './SearchResult/SearchResultSm';

class SearchResult extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  renderSearchResultMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <SearchResultMd {...props}/>
      </div>
    );
  }

  renderSearchResultSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <SearchResultSm {...props}/>
      </div>
    );
  }

  renderSearchResultXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <SearchResultXl {...props}/>
      </div>
    );
  }

  renderSearchResultXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <SearchResultXs {...props}/>
      </div>
    );
  }
  render(){
    return(
      <div>
        {this.renderSearchResultXl(this.props)}
        {this.renderSearchResultXs(this.props)}
        {this.renderSearchResultMd(this.props)}
        {this.renderSearchResultSm(this.props)}
      </div>

    );
  }
}


export default SearchResult;
