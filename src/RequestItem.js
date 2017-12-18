import React from 'react';

class RequestItem extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      request:null,
      requestStatus:null,
      token:'460b152177ab02716faa0d7795ff60f12d7cbd9d'
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      request:nextProps.requestDetail,requestStatus:nextProps.requestDetail.status
    });
    console.log(nextProps);

  }

  getRequestStatus(){
        switch (this.state.requestStatus){
          case "WAIT_FOR_HOST":
            return 'در انتظار تایید میزبان';
          case "GUEST_CANCELED":
            return null;
          case "HOST_REJECTED":
            return 'رد شده توسط مهمان';
          case "WAIT_FOR_GUEST_PAY":
            return 'در انتظار پرداخت مهمان';
          case "HOST_ACCEPTED_GUEST_CANCELED":
            return 'لغو شده توسط مهمان';
          case "HOST_ACCEPTED_GUEST_PAYED":
            return 'پرداخت شده توسط مهمان';
          case "HOST_ACCEPTED_HOST_CANCELED":
            return 'لغو شده توسط میزبان';
          default:
            return null;
        }
  }
  getRelevantButton(){
    switch (this.state.requestStatus){
      case "WAIT_FOR_HOST":
        return null
      case "HOST_REJECTED":
        return (<button>حذف درخواست </button>);
      case "WAIT_FOR_GUEST_PAY":
        return (<div>
          <button>حذف درخواست </button>
          <button>پرداخت</button>
          </div>);
      case "HOST_ACCEPTED_GUEST_PAYED":
        return (<button>حذف درخواست </button>);;
      case "HOST_ACCEPTED_HOST_CANCELED":
        return (<button>حذف درخواست </button>);;
      default:
        return null;
    }
  }
  getRequestStatusDiscription(){
    switch (this.state.requestStatus){
      case "WAIT_FOR_HOST":
        return <span>
        درخواست شما در انتظار تأیید میزبان است و پس از تأیید میزبان،
        می توانید هزینه را پرداخت کنید و رزرو خود را نهایی کنید
        </span>
      case "GUEST_CANCELED":
        return <span>
        </span>;
      case "HOST_REJECTED":
        return <span>
          متاسفانه درخواست شما توسط میزبان مورد تأیید قرار نگرفت
        </span>;
      case "WAIT_FOR_GUEST_PAY":
        return <span>
        درخواست شما تایید شده است، با پرداخت هزینه رزرو خود را
        نهایی کنید. در صورت لغو توسط شما و یا میزبان بعد از پرداخت
        هزینه، قوانین لغو اعمال می شود.
        </span>;
      case "HOST_ACCEPTED_GUEST_CANCELED":
        return <span>
        این درخواست توسط مهمان قبل از
        پرداخت هزینه لغو شد.
        </span>;
      case "HOST_ACCEPTED_GUEST_PAYED":
        return <span>
        این رزرو نهایی شده است،
برای مشاهده‌ی جزئیات آن به بخش
سفرها
مراجعه کنید.

        </span>;
      case "HOST_ACCEPTED_HOST_CANCELED":
        return <span>
        متاسفانه درخواست شما
توسط میزبان
مورد تایید قرار نگرفت.
        </span>;
      default:
        return null;
    }
}
renderCancelButton(){
  if(this.state.requestStatus!=="GUEST_CANCELED"){
   return (<button onClick={this.handleCancelClick.bind(this)}> لغو درخواست </button>);
  }
}
renderDeleteButton(){
  if(this.state.requestStatus!=="HOST_ACCEPTED_GUEST_CANCELED"){
   return (<button onClick={this.handleDeleteClick.bind(this)}>حذف درخواست</button>);
  }
}
  renderRequestDetail(){
    if (this.state.request!=null && this.state.requestStatus!=null){
      return (
        <div>
        <div className='request-status'>
          <p> وضعیت درخواست رزرو </p>
          <p> {this.getRequestStatus()} </p>
          <p>{this.getRequestStatusDiscription()} </p>
        </div>
        <div className='house-prewview-linked-to-house-detail'>
          <img scr={"https://www.trypinn.com/"+this.state.request.room.preview}></img>
          <p>{this.state.request.room.title} </p>
          <p>{this.state.request.room.owner.first_name} {this.state.request.room.owner.last_name}</p>
          <p>{this.state.request.room.city} </p>
        </div>
        <div className='request-details'>
          <p>{this.state.request.guest_person.last_name} </p>
          <p>{this.state.request.number_of_guests} </p>
          {this.renderCancelButton()}
          {this.renderDeleteButton()}
          <p>{this.state.request.start_date} </p>
          <p>{this.state.request.end_date} </p>
        </div>
        <div className='final-details'>
          <p> {this.state.request.total_price} </p>
        </div>
        <div className='relevant button'>
          {this.getRelevantButton()}

        </div>
        </div>
      );
    }
  }

  handleCancelClick(){
    console.log("sdfghjkl");
    console.log(this.state.requestStatus);
    if(this.state.request!=null){
      console.log('QOP:LKJHGFDSAZXCVBNM<>');
      console.log(this.state.request.id);
    var request = new Request('https://www.trypinn.com/api/request/cancel/',{
      method: 'POST',
      body: JSON.stringify({
      request_id:this.state.request.id,
      role:'guest'
    }),
      headers: new Headers({'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((request_status) => {
   console.log('333333333');
   console.log(request_status);
   console.log('333333333');
  });
}
  }
  handleDeleteClick(){
    console.log("injaaaaaaaaaa");
    var request = new Request('https://www.trypinn.com/api/request/archive/',{
      method: 'POST',
      body: JSON.stringify({
      request_id:this.state.request.id,
      role:'guest'

    }),
      headers: new Headers({'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token ' +this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((request_status) => {
   console.log(request_status)
   console.log('444444444');
  });

  }



  render(){
    return(
      <div>
        {this.renderRequestDetail()}
      </div>
    );
  }
}

export default RequestItem;
