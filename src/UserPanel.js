import React from 'react';
class UserPanel extends React.Component{
  render() {
    return (
      <div>
      <button className="messages">
        پیام ها
</button>
<button className="requests">
درخواست ها
</button>
<button className="trips">
سفرها
</button>
      </div>
    );
  }
}
export default UserPanel;
