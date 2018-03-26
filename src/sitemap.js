import sm from 'sitemap';
// import fs from 'fs';
var fs = require('file-system');
var sitemap = sm.createSitemap ({
       hostname: 'http://www.tripinn.ir',
       cacheTime: 600000
     });

export const generateSiteMap=()=>{
  //
  sitemap.add({url : '/search/شیراز',priority : 1 , lastmod:new Date()});
  sitemap.add({url : '/search/کیش',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/نوشهر',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/گیلان',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/مازندران',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/اصفهان',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/فارس',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/رامسر',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/محمودآباد',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/شاندیز',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/مشهد',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/خراسان رضوی',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/نور',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/نشتارود',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/فومن',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/تنکابن',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/بابلسر',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/گلستان',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/یزد',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/بافق',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/خواف',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/داراب',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/آستارا',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/چمخاله',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/چالوس',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/کاشان',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/کلارآباد',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/کلاردشت',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/سلمان‌شهر',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/ایزدشهر',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/search/عباس‌آباد',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/aboutus',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/contactus',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/terms&conditions',priority : 1,lastmod:new Date()});
  sitemap.add({url : '/suggestions',priority : 1,lastmod:new Date()});
  getDataFromServer();
}

const getDataFromServer=()=> {
 var request = new Request('https://www.trypinn.com/api/v1/search/',{
   method: 'POST',
   body: JSON.stringify({
     platform: 'web',
     location: null,
     start_date: null,
     end_date  : null,
     capacity: 1,
 }),
   headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
   'Authorization': 'Token '+localStorage['token'],})
 });
fetch(request)
.then((response) => {
  // console.log(response);
  return response.json();
})
.then((homeData) => {
  console.log(homeData);
  for (var homeCounter=0;homeCounter<homeData.total_count;homeCounter++){
    switch(homeData.room[homeCounter].type){
      case 'room':{
        sitemap.add({url : '/rooms/' + homeData.room[homeCounter].id ,
        lastmod:new Date(),
        priority:0.9 ,
        img:[{url:'https://www.trypinn.com/' + homeData.room[homeCounter].preview}]
      }
    );
        break;
      }
      case 'ecotourism':{
        sitemap.add({url : '/ecotourism/' + homeData.room[homeCounter].id ,
        lastmod:new Date(),
        priority:0.9 ,
        img:[{url:'https://www.trypinn.com/' + homeData.room[homeCounter].preview}]
      }
    );
    break;
      }
    }
  }
  sitemap.toXML( function(err, xml){ if (!err){} });
  var xml = sitemap.toString();
  var link = document.createElement('a');
  link.setAttribute('href', 'data:text/plain,' + xml);
  link.setAttribute('download', 'sitemap.xml');
  link.click();
  // console.log(xml);
});
}
