import React from 'react';
import SearchBarXl from './SearchBar/SearchBarXl.js';
import SearchBarXs from './SearchBar/SearchBarXs.js';
import SearchBarMd from './SearchBar/SearchBarMd.js';
import SearchBarSm from './SearchBar/SearchBarSm.js';
import DocumentMeta from 'react-document-meta';

class SearchBar extends React.Component {

  renderSearchBarXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <SearchBarXl {...props}/>
      </div>
    );
  }

  renderSearchBarXS(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <SearchBarXs {...props}/>
      </div>
    );
  }

  renderSearchBarMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <SearchBarMd {...props}/>
      </div>
    );
  }

  renderSearchBarSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <SearchBarSm {...props}/>
      </div>
    );
  }
  render(){
    const meta = {
      title: '',
      description: 'تریپین ، سامانه رزرو ویلا و اقامتگاه محلی',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'تریپین، ویلا،رزرو، بوم گردی، اقامتگاه'
        }
      }
    };

    document.title = "تریپین | سامانه رزرو ویلا";
    return (
      <div>
        <DocumentMeta {...meta}/>
        {this.renderSearchBarXS(this.props)}
        {this.renderSearchBarXl(this.props)}
        {this.renderSearchBarMd(this.props)}
        {this.renderSearchBarSm(this.props)}
      </div>
    );
  }
}
export default SearchBar;
