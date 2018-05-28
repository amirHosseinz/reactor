import React from 'react';
import FinanceAccountXl from './FinanceAccount/FinanceAccountXl.js';
import FinanceAccountXs from './FinanceAccount/FinanceAccountXs.js';
import FinanceAccountMd from './FinanceAccount/FinanceAccountMd.js';
import FinanceAccountSm from './FinanceAccount/FinanceAccountSm.js';
import MetaTags from 'react-meta-tags';


class FinanceAccount extends React.Component{

  renderFinanceAccountXl(props) {
    return (
      <div className="visible-xl hidden-md hidden-xs hidden-sm">
        <FinanceAccountXl {...props} />
      </div>
    );
  }

  renderFinanceAccountXs(props) {
    return (
      <div className="hidden-xl hidden-md visible-xs hidden-sm">
        <FinanceAccountXs {...props} />
      </div>

    );
  }

  renderFinanceAccountMd(props) {
    return (
      <div className="hidden-xl visible-md hidden-xs hidden-sm">
        <FinanceAccountMd {...props} />
      </div>

    );
  }

  renderFinanceAccountSm(props) {
    return (
      <div className="hidden-xl hidden-md hidden-xs visible-sm">
        <FinanceAccountSm {...props}/>
      </div>

    );
  }
  render(){
    return (
      <div>
        <MetaTags>
          <title> تریپین | کیف پول</title>
        </MetaTags>
        {this.renderFinanceAccountXl(this.props)}
        {this.renderFinanceAccountXs(this.props)}
        {this.renderFinanceAccountSm(this.props)}
        {this.renderFinanceAccountMd(this.props)}
      </div>
    );
  }
}

export default FinanceAccount;
