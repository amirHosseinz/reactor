import React from 'react';
import { Divider } from 'semantic-ui-react';
import Collapsible from 'react-collapsible';
import {englishToPersianDigits} from './tools/EnglishToPersianDigits.js';
class Terms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      OpenPanel1:false,
      OpenPanel2:false,
      OpenPanel3:false,
      OpenPanel4:false,
      OpenPanel5:false,
      OpenPanel6:false,
      OpenPanel7:false,
      OpenPanel8:false,
      OpenPanel9:false,
      OpenPanel10:false,
      OpenPanel11:false,
        };
  }

  renderOpenPanel1(){
    this.setState({OpenPanel1:true});
  }

  renderClosePanel1(){
    this.setState({OpenPanel1:false});
  }

  renderOpenPanel2(){
    this.setState({OpenPanel2:true});
  }

  renderClosePanel2(){
    this.setState({OpenPanel2:false});
  }

  renderOpenPanel3(){
    this.setState({OpenPanel3:true});
  }

  renderClosePanel3(){
    this.setState({OpenPanel3:false});
  }

  renderOpenPanel4(){
    this.setState({OpenPanel4:true});
  }

  renderClosePanel4(){
    this.setState({OpenPanel4:false});
  }

  renderOpenPanel5(){
    this.setState({OpenPanel5:true});
  }

  renderClosePanel5(){
    this.setState({OpenPanel5:false});
  }
  renderOpenPanel6(){
    this.setState({OpenPanel6:true});
  }

  renderClosePanel6(){
    this.setState({OpenPanel6:false});
  }
  renderOpenPanel7(){
    this.setState({OpenPanel7:true});
  }

  renderClosePanel7(){
    this.setState({OpenPanel7:false});
  }
  renderOpenPanel8(){
    this.setState({OpenPanel8:true});
  }

  renderClosePanel8(){
    this.setState({OpenPanel8:false});
  }
  renderOpenPanel9(){
    this.setState({OpenPanel9:true});
  }

  renderClosePanel9(){
    this.setState({OpenPanel9:false});
  }
  renderOpenPanel10(){
    this.setState({OpenPanel10:true});
  }

  renderClosePanel10(){
    this.setState({OpenPanel10:false});
  }
  renderOpenPanel11(){
    this.setState({OpenPanel11:true});
  }

  renderClosePanel11(){
    this.setState({OpenPanel11:false});
  }

  render(){
    return(
      <div className='terms-cadre'>
        <div className="terms-container" dir="rtl">
          <h1 className='terms-header'>قوانین و مقررات  <span className='about-us-tripinn'>تریپین</span></h1>
          <p>نرم افزار تریپین که توسط شرکت طراحی و راهبری فناوران دانش‌سامان آریا برای تسهیل اقامت مسافران طراحی گردیده ، تحت شرایط زیر خدمات مربوطه را ارائه می‌نماید؛ لذا این شرایط به عنوان یک قرارداد الزام‌آور بر روابط بین کاربران و شرکت حاکم خواهد بود.
          </p>
          <p>بر این اساس ضروری است پیش از استفاده از خدمات تریپین ، این شروط را به دقت مطالعه فرمایید . استفاده از تریپین به منزله قبول تمامی شرایط ذیل است و هرگونه ادعا یا اعتراض آتی در این خصوص را فاقد اعتبار می‌داند . شرکت ممکن است شرایط و سطح خدمات تریپین را در طول زمان تغییر دهد . این تغییرات از طریق برنامه تریپین به تمامی کاربران اطلاع داده خواهد شد؛ صرف ادامه استفاده کاربر از خدمات تریپین، اعلام رضایت نسبت به شرایط جدید و قبول آن تلقی می‌گردد.
          </p>
          <p>تمامی تصاویر، علامات و نشان های الکترونیکی از سمت کاربران که به منظور تایید این سند و عضویت در تریپین باشد به منزله امضای الکترونیک وهمانند امضای دست‌نویس معتبر خواهد بود و امضاکننده را به مفاد سند ملتزم می‌نماید.
          </p>
          <p className='terms-sub-title'>
          <span>۱)</span><span> خدمات </span><span>تریپین</span>
          </p>
          <Divider />
          <p className='terms-services-main1'>
          تریپین نرم‌افزار ارائه‌دهنده خدمات اقامتی به مسافران در قالب اپلیکیشن تلفن همراه و وبسایت اینترنتی است. این سامانه یک پل ارتباطی بین میزبان و مسافر برقرار می‌سازد که ارتباط کاربران (کسانی که درخواست اقامت را ارسال می کنند) با میزبان (کسانی که مایل به ارائه خدمات اقامتی هستند) را تسهیل می‌کند. ضمنا در تریپین، میزبان میان پذیرش درخواست یا رد آن مختار است و مسافر نیز پس از ارسال درخواست سفر و مشخص شدن میزبان می‌تواند از درخواست خود انصراف بدهد؛ بنابراین هر اقامتی که در قالب این برنامه نرم‌افزاری صورت می‌گیرد یک قرارداد مستقل بین میزبان و مسافر است و تریپین تنها زمینه انعقاد قرارداد را میان آنها در هر سفر مهیا می‌کند. لذا الویت حقوقی و کیفری در قبال اتفاقات حین اقامت آن طور که در این قرارداد ذکر شده است به عهده‌ی کاربران (مهمانان و میزبانان) خواهد بود.
          </p>
          <p className='terms-sub-title' >
         <span>۲) </span><span>  استفاده از خدمات</span>
          </p>
          <Divider />
          <p className='terms-services-main2'>
          قوانین استفاده از خدمات تریپین به شرح زیر میباشد. استفاده از تریپین به منزله قبول این قوانین خواهد بود
          </p>

          <Collapsible onClose={this.renderClosePanel1.bind(this)} onOpen={this.renderOpenPanel1.bind(this)} trigger={<div className="terms-panel-box"><span className={this.state.OpenPanel1?"terms-open-panel1-text":"terms-close-panel1-text"}><span>۲-۱-</span> <span> مقررات ثبت نام و تأیید حساب کاربری</span></span> <img className={this.state.OpenPanel1?"terms-open-panel-img":"terms-close-panel-img"} src={require('./Images/angle-down copy.svg')} width="40" height="40" /></div>}>
          <div className='terms-panel1-container'>

                    <p>
                    برای عضویت در تریپین و استفاده از تمامی خدمات آن، لازم است هر کاربر یک حساب کاربری در تریپین ایجاد نماید. برای ایجاد حساب کاربری شرایط زیر الزامی است و قوانین زیر بر آن اعمال می‌شود:
                    </p>
                    <p>
                    الف)
                    	داشتن ۱۸سال تمام شمسی.
                    </p>
                    <p>
                    ب)
                    تکمیل فرم مشخصات.
                    </p>
                    <p>
                    ج)
                    حساب کاربری افراد تنها در صورتی فعال می‌شود که شماره تلفن همراه معتبر در زمان ثبت نام ارائه کرده و کد ارسالی توسط تریپین را وارد نمایند.
                    </p>
                    <p>
                    د)
                    	مسئولیت صحت اطلاعات وارد شده به عهده صاحب حساب کاربری می‌باشد. وارد کردن اطلاعات نادرست وغلط ممکن است منجر به محرومیت کاربر از خدمات تریپین شود و کاربر نمی‌تواند به این موضوع معترض شود.
                    </p>
                    <p>
                    ه)
                    هر فرد تنها می‌تواند یک حساب کاربری داشته باشد.
                    </p>
                    <p>
                    و)
                    هر کاربر با ثبت نام در تریپین و ایجاد حساب کاربری به نام خود، صحت انتساب تمام پیام‌های صادره از حساب کاربری خویش را پذیرفته و در نتیجه حق هرگونه اعتراض یا ادعای آتی (مبنی بر انکار، تردید یا جعل پیام های ارسالی) را از خویش سلب و ساقط می‌نماید.
                    </p>
                    <p>
                    ز)
                    در صورت عدم همکاری کاربر و ارائه ندادن اطلاعات مربوطه - در شرایط خاص که ممکن است احراز هویت کاربر از جانب شرکت ضروری تشخیص داده شود- شرکت حق انسداد حساب کاربر را خواهد داشت.
                    </p>
          </div>
          </Collapsible>

          <Collapsible onClose={this.renderClosePanel2.bind(this)} onOpen={this.renderOpenPanel2.bind(this)} trigger={<div className="terms-panel-box"><span className={this.state.OpenPanel2?"terms-open-panel2-text":"terms-close-panel2-text"}><span> ۲-۲- </span> <span>   مقررات ثبت اقامتگاه</span></span> <img className={this.state.OpenPanel2?"terms-open-panel-img":"terms-close-panel-img"} src={require('./Images/angle-down copy.svg')} width="40" height="40" /></div>}>
          <div className='terms-panel1-container'>


                    <p>
                    a)	هر فرد برای ثبت اقامتگاه در تریپین، ملزم به وارد کردن اطلاعات زیر می‌باشد:
                    </p>
                    <p>
                    {englishToPersianDigits(1)})	مکان اقامتگاه (آدرس دقیق، مکان حدودی)
                    </p>
                    <p>
                    {englishToPersianDigits(2)})	نوع اقامتگاه (سوئیت، آپارتمان، خانه یا ویلا)
                    </p>
                    <p>
                    {englishToPersianDigits(3)})	تعداد اتاق‌ها
                    </p>
                    <p>
                    {englishToPersianDigits(4)})	حداکثر تعداد مهمانان
                    </p>
                    <p>
                    {englishToPersianDigits(5)})	عکس هر اتاق، هال و آشپزخانه
                    </p>
                    <p>
                    {englishToPersianDigits(6)})	امکانات
                    </p>
                    <p>
                    {englishToPersianDigits(7)})	 ساعت ورود و خروج
                    </p>
                    <p>
                    {englishToPersianDigits(8)})	قیمت (برای روزهای هفته، روزهای آخرهفته و ایام تعطیل)
                    </p>
                    <p>

                    b)	اقامتگاه باید ورودی جداگانه داشته باشد و کاملا خصوصی باشد.
                    </p>
                    <p>
                    c)	میزبان موظف است از نگهداری هرگونه وسیله‌ی شخصی مورد استفاده‌ی خود در واحد اجاره داده‌شده در طول دوران اجاره خودداری نماید.
                    </p>
                    <p>
                    d)	میزبان موظف است اطلاعات محرمیت مهمانان و تطابق آن با قوانین شرع و جمهوری اسلامی را در زمان ارائه کلید به مهمان بررسی کند.
                    </p>
                    <p>
                    e)	میزبانان تنها در صورتی می‌توانند اقامتگاه را ثبت نمایند که اجازه اجاره دادن آن را بر أساس قانون داشته باشند. در صورت تخطی از این بند، تریپین هیچگونه مسئولیتی در قبال تعهدهای قانونی نخواهد داشت.
                    </p>
                    <p>
                    f)	میزبانان با قراردادن اقامتگاه خود در سایت تریپین متعهد می شوند که در زمان اقامت مهمان، در دسترس مهمان باشند.
                    </p>
                    <p>
                    g)	پس از ثبت اقامتگاه توسط میزبان، سایت تریپین این حق را دارد که پیش از تایید اقامتگاه و نمایش آن در سایت، از اقامتگاه بازدید کند و تطابق اقامتگاه با اطلاعات وارد شده را بررسی نماید.
                    </p>
                    <p>
                    h)	ثبت اقامتگاه در سایت تریپین توسط میزبان به منزله تایید و نمایش آن اقامتگاه نخواهد بود و سایت تریپین حق عدم تایید و نمایش اقامتگاه‌ها را برای خود محفوظ می‌دارد.
                    </p>
                    <p>
                    i)	میزبان با قراردادن اقامتگاه خود در سایت تریپین ، موظف است از تمامی مقررات این سند پیروی کند. همچنین میزبان موافقت می‌کند که این سایت تنها معرفی‌کننده و واصل میان مهمانان و میزبانان است. تنها تعهد تریپین به میزبان، پرداخت سهم میزبان از وجه دریافت شده از مهمان است و این سایت هیچگونه مسئولیتی در قبال خسارت‌های ناشی از اقامت و رفتارهای خارج از عرف و قانون مهمان نخواهد داشت.
                    </p>

          </div>
          </Collapsible>

          <Collapsible onClose={this.renderClosePanel3.bind(this)} onOpen={this.renderOpenPanel3.bind(this)} trigger={<div className="terms-panel-box"><span className={this.state.OpenPanel3?"terms-open-panel3-text":"terms-close-panel3-text"}><span>۲-۳-</span><span> مقررات رزرو </span></span> <img className={this.state.OpenPanel3?"terms-open-panel-img":"terms-close-panel-img"} src={require('./Images/angle-down copy.svg')} width="40" height="40" /></div>}>
          <div className='terms-panel1-container'>



                    <p>
                    a)	مهمانان می‌توانند قبل از درخواست رزرو، با میزبان یا نماینده میزبان برای پرسیدن سوال در مورد اقامتگاه در تماس باشند. این تماس باید در قالب سایت و یا اپلیکیشن تلفن همراه ارائه شده از طرف تریپین برقرار شود.
                    </p>
                    <p>
                    b)	مهمانان می توانند توسط سایت و یا اپلیکیشن تلفن همراه ارائه شده از طرف تریپین برای اقامتگاه مورد نظر خود درخواست رزرو بفرستند.
                    </p>
                    <p>

                    c)	میزبان می تواند درخواست مهمان را تایید و یا رد کند.
                    </p>
                    <p>
                    d)	در صورت تایید نشدن درخواست رزرو از طرف میزبان ظرف ۲۴ ساعت، سیستم به صورت خودکار درخواست را لغو خواهد کرد.
                    </p>
                    <p>
                    e)	در صورت تایید میزبان، مهمان حداقل ۴ ساعت فرصت دارد مبلغ کامل اقامتگاه را پرداخت نماید. پس از ۴ ساعت، میزبان امکان لغو تایید را خواهد داشت.
                    </p>
                    <p>
                    f)	تا زمانی که تایید میزبان لغو نشده است، اقامتگاه برای زمان رزرو شده غیر قابل دسترس خواهد بود.
                    </p>
                    <p>
                    g)	رزرو اقامتگاه نمی‌تواند برای فرد دیگری انجام شود. در صورتی که اطلاعات ارائه شده در حساب کاربری با اطلاعات ارائه شده توسط مهمان در هنگام تحویل کلید یکسان نباشد، میزبان موظف است در اولین فرصت به شرکت اطلاع دهد و اجازه دارد از ورود مهمان جلوگیری کند.
                    </p>
                    <p>
                    h)	پس از پرداخت وجه رزرو توسط مهمان، رزرو نهایی تلقی شده و در صورت کنسل شدن از طرف هر یک از طرفین، سایت طبق بند های مورد ۸-۲ عمل خواهد کرد.
                    </p>
          </div>
          </Collapsible>

          <Collapsible onClose={this.renderClosePanel4.bind(this)} onOpen={this.renderOpenPanel4.bind(this)} trigger={<div className="terms-panel-box"><span className={this.state.OpenPanel4?"terms-open-panel4-text":"terms-close-panel4-text"}><span>۲-۴-</span><span> مقررات تحویل خانه </span></span> <img className={this.state.OpenPanel4?"terms-open-panel-img":"terms-close-panel-img"} src={require('./Images/angle-down copy.svg')} width="40" height="40" /></div>}>
          <div className='terms-panel1-container'>


                    <p>
                    a)	قبل از انجام اولین رزرو، کاربر مهمان موظف است شماره ملی خود را در اطلاعات حساب کاربری خود وارد کند.
                    </p>
                    <p>

                    b)	میزبان موظف است نام و شماره ملی ارائه شده از طرف تریپین را با کارت شناسایی وچهره مهمانان تطابق دهد. در صورت عدم تطابق اطلاعات ارائه شده توسط سایت و مهمان، میزبان موظف است در اولین فرصت به شرکت اطلاع دهد و اجازه دارد از ورود مهمان جلوگیری کند.
                    </p>
                    <p>
                    c)	در صورتی که مهمان اظهار نماید که ادعای میزبان مبنی بر عدم تطابق درست نمی‌باشد، مرکز حل اختلاف بر سر تایید مهمان تصمیم می‌گیرد.
                    </p>
                    <p>
                    d)	مرکز حل اختلاف مسئله را به عنوان ۱) تطابق ۲) عدم تطابق و یا ۳) سوء تفاهم شناسایی می‌کند.
                    </p>
                    <p>

                    e)	اگر مسئله به عنوان عدم تطابق شناسایی شد، پول میزبان پرداخت خواهد شد و امکان رزرو اقامتگاه در زمان رزرو شده توسط سایت وجود ندارد.
                    </p>
                    <p>
                    f)	اگر مسئله به عنوان تطابق شناسایی شد، میزبان موظف است مهمان را پذیرش کند.
                    </p>
                    <p>
                    g)	اگر مسئله به عنوان « سوء تفاهم » شناسایی شود، به عنوان حل شده توسط مرکز اختلاف شناسایی می‌شود.
                    </p>
                    <p>
                    h)	در زمان تحویل کلید، مهمان موظف است یک کارت شناسایی از خود را در اختیار میزبان قرار دهد. این کارت تا پایان اقامت مهمان در اختیار میزبان خواهد ماند.
                    توجه : پس از پایان اقامت و در صورت عدم بروز هرگونه اختلاف میان میزبان و مهمان، میزبان موظف است کارت شناسایی مهمان را به وی بازگرداند.
                    توجه : در صورت بروز اختلاف تریپین مسئولیتی در قبال خسارات و ادعاهای طرفین نخواهد داشت.
                    </p>
          </div>
          </Collapsible>

          <Collapsible onClose={this.renderClosePanel5.bind(this)} onOpen={this.renderOpenPanel5.bind(this)} trigger={<div className="terms-panel-box"><span className={this.state.OpenPanel5?"terms-open-panel5-text":"terms-close-panel5-text"}><span>۲-۵-</span><span>مقررات نقد و امتیازدهی</span></span> <img className={this.state.OpenPanel5?"terms-open-panel-img":"terms-close-panel-img"} src={require('./Images/angle-down copy.svg')} width="40" height="40" /></div>}>
          <div className='terms-panel1-container'>

                    <p>
                    a)	مهمان و میزبان می‌توانند پس از پایان سفر برای یکدیگر نقد بنویسند. این نقد‌ها باید حداکثر یک هفته بعد از اتمام سفر نوشته شوند.
                    </p>
                    <p>
                    b)	تریپین حق دارد هر گونه نقد توهین‌آمیز و یا غیرقانونی (بر اساس قوانین جمهوری اسلامی ایران) را حذف کند.
                    </p>
                    <p>
                    c)	مهمان و میزبان می‌توانند تنها برای یک بار به نقد یکدیگر پاسخ دهند.
                    </p>

          </div>
          </Collapsible>

          <Collapsible onClose={this.renderClosePanel6.bind(this)} onOpen={this.renderOpenPanel6.bind(this)} trigger={<div className="terms-panel-box"><span className={this.state.OpenPanel6?"terms-open-panel6-text":"terms-close-panel6-text"}>  <span>۲-۶-</span><span> مقررات مالی مهمان </span></span> <img className={this.state.OpenPanel6?"terms-open-panel-img":"terms-close-panel-img"} src={require('./Images/angle-down copy.svg')} width="40" height="40" /></div>}>
          <div className='terms-panel1-container'>


                    <p>
                    a)	در صورت تایید میزبان، مهمان حداقل ۴ ساعت فرصت دارد مبلغ کامل اقامتگاه را پرداخت نماید. پس از ۴ ساعت، میزبان امکان لغو تایید را خواهد داشت.
                    </p>
                    <p>
                    b)	پس از تایید درخواست رزرو توسط میزبان، امکان رزرو اقامتگاه مورد نظر تا زمانی که میزبان تایید خود را لغو نکرده است برای تاریخ‌های اعلام‌شده توسط مهمان برداشته خواهد شد. در صورتی که مهمان هزینه اقامتگاه را تا قبل از لغو تایید پرداخت نکند، اقامتگاه مورد نظر به لیست جست‌وجو بازخواهد گشت و فرایند رزرو از ابتدا باید شروع شود.
                    </p>

          </div>
          </Collapsible>

          <Collapsible onClose={this.renderClosePanel7.bind(this)} onOpen={this.renderOpenPanel7.bind(this)} trigger={<div className="terms-panel-box"><span className={this.state.OpenPanel7?"terms-open-panel7-text":"terms-close-panel7-text"}><span> ۲-۷- </span> <span>مقررات مالی میزبان  </span></span> <img className={this.state.OpenPanel7?"terms-open-panel-img":"terms-close-panel-img"} src={require('./Images/angle-down copy.svg')} width="40" height="40" /></div>}>
          <div className='terms-panel1-container'>

                <p>
                a)	سهم میزبان از اجاره اولین شب رزرو پس از کامل شدن رزرو به حساب میزبان واریز خواهد شد.
                </p>
                <p>
                b)	مابقی سهم میزبان از مبلغ اجاره پس از پایان زمان اجاره و تحویل کارت شناسایی مهمان برای میزبان واریز خواهد شد.
                </p>

          </div>
          </Collapsible>

          <Collapsible onClose={this.renderClosePanel8.bind(this)} onOpen={this.renderOpenPanel8.bind(this)} trigger={<div className="terms-panel-box"><span className={this.state.OpenPanel8?"terms-open-panel8-text":"terms-close-panel8-text"}><span>۲-۸-</span><span> مقررات کنسل کردن رزرو و بازپرداخت </span></span> <img className={this.state.OpenPanel8?"terms-open-panel-img":"terms-close-panel-img"} src={require('./Images/angle-down copy.svg')} width="40" height="40" /></div>}>
          <div className='terms-panel1-container'>
          <p>
          a)	در صورتی که مهمان در فاصله زمانی بیشتر از ۴۸ ساعت به زمان تحویل کلید رزرو را کنسل کند، تمامی مبلغ اجاره به مهمان بازگردانده می شود. در این صورت میزبان موظف است مبلغ دریافتی جهت اجاره شب اول را ظرف مدت ۲۴ ساعت برای شرکت واریز نماید.
          </p>
          <p>
          b)	در صورتی که مهمان قبل از دریافت کلید و در زمانی کمتر از ۴۸ ساعت به آغاز زمان تحویل کلید رزرو را کنسل کند، کل مبلغ اجاره به غیر از هزینه شب اول به وی بازگردانده می شود.
          </p>
          <p>
          c)	در صورتی که مهمان پس از زمان تحویل کلید رزرو را کنسل کند، هزینه‌ی اقامت در آن واحد برای کمترین مقدار بین ۴۸ ساعت آینده یا تا پایان مدت رزرو از مهمان کثر می‌گردد و مابقی وجه استرداد می‌گردد.
          </p>
          <p>
          d)	در صورتی که میزبان رزرو را کنسل کند، تمامی مبلغ اجاره به مهمان بازگردانده می‌شود. در این موقعیت میزبان موظف است مبلغ دریافتی جهت اجاره شب اول را ظرف مدت ۲۴ ساعت برای شرکت واریز نماید.
          </p>
          <p>
          e)	در صورتی که میزبان رزرو را کنسل کند، شرکت تلاش می‌کند اقامتگاهی با شرایط مشابه (امکانات و قیمت) با اقامتگاه انتخابی مهمان برای وی تهیه کند. هزینه اقامتگاه ارائه شده به عهده مهمان می‌باشد. با این وجود، شرکت هیچ تعهدی در قبال ارائه اقامتگاه جایگزین نخواهد داشت.
          </p>
          </div>
          </Collapsible>

          <Collapsible onClose={this.renderClosePanel9.bind(this)} onOpen={this.renderOpenPanel9.bind(this)} trigger={<div className="terms-panel-box"><span className={this.state.OpenPanel9?"terms-open-panel9-text":"terms-close-panel9-text"}><span>۲-۹-</span><span> مقررات مربوط به اعمال غیرقانونی </span></span> <img className={this.state.OpenPanel9?"terms-open-panel-img":"terms-close-panel-img"} src={require('./Images/angle-down copy.svg')} width="40" height="40" /></div>}>
          <div className='terms-panel1-container'>
          <p>
          a)	میزبانان و مهمانان به طور کامل مسئول تمامی اعمال خویش بر اساس قوانین جمهوری اسلامی ایران خواهند بود.
          </p>
          <p>
          b)	تمامی قوانین جمهوری اسلامی ایران برای تمامی مشکلات و اختلافات اجرایی می‌باشند و سایت ما به طور کامل از این قوانین پیروی می‌کند.
          </p>
          <p>
          c)	در صورت مشاهده عمل خلاف قانون توسط مهمان، میزبان می تواند ارائه خدمات به مهمان را متوقف کند. در این صورت هیچ بازپرداختی به مهمان صورت نخواهد گرفت.
          </p>
          <p>
          d)	شرکت ما حق حل هر گونه مسئله و مشکلی با استفاده از تمامی ابزارهای قانونی را برای خود محفوظ می‌دارد.
          </p>
          </div>
          </Collapsible>

          <Collapsible onClose={this.renderClosePanel10.bind(this)} onOpen={this.renderOpenPanel10.bind(this)} trigger={<div className="terms-panel-box"><span className={this.state.OpenPanel10?"terms-open-panel10-text":"terms-close-panel10-text"}><span>۲-۱۰-</span><span> لغو قرارداد و حساب کاربری </span></span> <img className={this.state.OpenPanel10?"terms-open-panel-img":"terms-close-panel-img"} src={require('./Images/angle-down copy.svg')} width="40" height="40" /></div>}>
          <div className='terms-panel1-container'>
          <p>
          a)	این قرارداد با حذف حساب کاربری ملغی خواهد شد.
          </p>
          <p>
          b)	با حذف حساب کاربری میزبانان، تمامی رزرو‌های مرتبط با حساب کاربری میزبان لغو خواهد شد و مهمان به طور کامل بازپرداخت می‌شود.
          </p>
          <p>
          c)	با حذف حساب کاربری مهمانان، تمامی سفرهای رزرو شده لغو خواهد شد و بازپرداخت طبق بند ۸-۲ انجام خواهد شد.
          </p>
          <p>
          d)	تریپین حق حذف حساب کاربری افراد تحت هر شرایطی را برای خود محفوظ می‌دارد.
          </p>
          <p>
          e)	در صورت حذف حساب کاربری توسط هر یک از طرفین، سیاست‌های لغو رزرو مبنی بر بند ۸-۲ اجرا خواهد شد و طرفین ملزم به تمکین خواهند بود.
          </p>
          <p>
          f)	در صورت لغو این قرارداد، کاربر حق دسترسی دوباره به محتویات و حساب کاربری خود را ندارد. در صورتی که لغو قرارداد توسط تریپین انجام شده باشد، کاربر حق ایجاد حساب کاربری جدید و یا استفاده از سایت با استفاده از حساب کاربری شخص دیگری را نخواهد داشت.
          </p>
          </div>
          </Collapsible>

          <Collapsible onClose={this.renderClosePanel11.bind(this)} onOpen={this.renderOpenPanel11.bind(this)} trigger={<div className="terms-panel-box"><span className={this.state.OpenPanel11?"terms-open-panel11-text":"terms-close-panel11-text"}>۲-۱۱- حریم خصوصی و محتویات</span> <img className={this.state.OpenPanel11?"terms-open-panel-img":"terms-close-panel-img"} src={require('./Images/angle-down copy.svg')} width="40" height="40" /></div>}>
          <div className='terms-panel1-container'>

                    <p>
                    a)	تریپین در حفاظت از اطلاعات شخصی کاربران تمامی تلاش خود را به کار خواهد بست.
                    </p>
                    <p>
                    b)	پس از نهایی شدن رزرو، اطلاعات نام، نام خانوادگی و شماره تماس میزبان و مهمان اقامتگاه مورد رزرو در اختیار طرفین رزرو قرار خواهد گرفت. در این مورد میزبان علاوه بر اطلاعات ذکر‌ شده، به شماره‌ی ملی مهمان نیز دسترسی خواهد داشت.
                    </p>
                    <p>
                    c)	به منظور بهبود خدمات، تریپین مجاز است از تمامی اطلاعات و محتوای‌ تولید‌شده توسط کاربران خود با حفط بی‌نشان بودن داده‌ها استفاده کند.
                    </p>
                    <p>
                    d)	در صورت درخواست مراجع قضایی، تریپین اطلاعات حساب شما را در اختیار مرجع قضایی مربوطه قرار خواهد داد.
                    </p>
          </div>
          </Collapsible>
          </div>
          </div>
    );
  }
}
export default Terms;
