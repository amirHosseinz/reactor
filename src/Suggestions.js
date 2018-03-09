import React from 'react';
import SuggestionsXl from './Suggestions/SuggestionsXl';
import SuggestionsXs from './Suggestions/SuggestionsXs';
import SuggestionsMd from './Suggestions/SuggestionsMd';
import SuggestionsSm from './Suggestions/SuggestionsSm';
import MetaTags from 'react-meta-tags';


class Suggestions extends React.Component{
  renderSuggestionsXs(){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <SuggestionsXs />
      </div>
    );
  }

  renderSuggestionsSm(){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <SuggestionsSm />
      </div>
    );
  }

  renderSuggestionsMd(){
      return(
        <div className="hidden-xs hidden-xl hidden-sm visible-md">
          <SuggestionsMd />
        </div>
      );
  }

  renderSuggestionsXl(){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <SuggestionsXl />
      </div>
    );
  }
  render(){
    return(
      <div>
        <MetaTags>
          <title>  تریپین | انتقادات و پیشنهادات</title>
        </MetaTags>
        {this.renderSuggestionsXs()}
        {this.renderSuggestionsXl()}
        {this.renderSuggestionsSm()}
        {this.renderSuggestionsMd()}
      </div>
    );
  }
}

export default Suggestions;
