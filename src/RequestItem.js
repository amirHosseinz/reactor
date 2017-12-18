import React from 'react';

class RequestItem extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      request:null,
      requestStatus:null,
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      request:nextProps.requestDetail,requestStatus:nextProps.requestDetail.status
    });
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
        return (<button> لغو درخواست </button>);
      case "GUEST_CANCELED":
        return null;
      case "HOST_REJECTED":
        return (<button>حذف درخواست </button>);
      case "WAIT_FOR_GUEST_PAY":
        return (<div>
          <button>حذف درخواست </button>
          <button>پرداخت</button>
          </div>);
      case "HOST_ACCEPTED_GUEST_CANCELED":
        return (<button>حذف درخواست </button>);;
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
  renderRequestDetail(){
    if (this.state.request!=null && this.state.requestStatus!=null){
      return (
        <div>
        <div className='request-status'>
          <p> وضعیت درخواست رزرو </p>
          <p> {this.getRequestStatus()} </p>
          <p>{this.getRequestStatusDiscription()} </p>
        </div>
        <div className='house-preview-linked-to-house-detail'>
          <img scr={"https://www.trypinn.com/"+this.state.request.room.preview}></img>
          <p>{this.state.request.room.title} </p>
          <p>{this.state.request.room.owner.first_name} {this.state.request.room.owner.last_name}</p>
          <p>{this.state.request.room.city} </p>
        </div>
        <div className='request-details'>
          <p>{this.state.request.guest_person.last_name} </p>
          <p>{this.state.request.number_of_guests} </p>
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
  render(){
    return(
      <div>
        {this.renderRequestDetail()}
      </div>
    );
  }
}

export default RequestItem;
