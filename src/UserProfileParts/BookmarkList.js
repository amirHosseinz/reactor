import React from 'react';
import BookmarkListXl from './BookmarkList/BookmarkListXl.js';
import BookmarkListXs from './BookmarkList/BookmarkListXs.js';
import BookmarkListMd from './BookmarkList/BookmarkListMd.js';
import BookmarkListSm from './BookmarkList/BookmarkListSm.js';
import MetaTags from 'react-meta-tags';


class BookmarkList extends React.Component{
  renderBookmarkListXl(props) {
    return (
      <BookmarkListXl {...props} className="visible-xl hidden-md hidden-xs hidden-sm"/>
    );
  }

  renderBookmarkListXs(props) {
    return (
      <BookmarkListXs {...props} className="hidden-xl hidden-md visible-xs hidden-sm"/>
    );
  }

  renderBookmarkListMd(props) {
    return (
      <BookmarkListMd {...props} className="hidden-xl visible-md hidden-xs hidden-sm"/>
    );
  }

  renderBookmarkListSm(props) {
    return (
      <BookmarkListSm {...props} className="hidden-xl hidden-md hidden-xs visible-sm"/>
    );
  }
  render(){
    return (
      <div>
      <MetaTags>
        <title> تریپین |‌ فهرست مورد علاقه ها </title>
      </MetaTags>
        {this.renderBookmarkListXl(this.props)}
        {this.renderBookmarkListXs(this.props)}
        {this.renderBookmarkListSm(this.props)}
        {this.renderBookmarkListMd(this.props)}
      </div>
    );
  }
}

export default BookmarkList;
