import sm from 'sitemap';
var sitemap = sm.createSitemap ({
       hostname: 'http://www.tripinn.ir',
       cacheTime: 600000
     });

export const generateSiteMap=()=>{
  //
  // sitemap.add({url : '/search/هر جا'});
  // sitemap.add({url : '/search/کیش'});
  // sitemap.add({url : '/search/نوشهر'});
  // sitemap.add({url : '/search/گیلان'});
  // sitemap.add({url : '/search/مازندران'});
  // sitemap.add({url : '/search/اصفهان'});
  // sitemap.add({url : '/search/فارس'});
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
  // console.log(homeData);
  for (var homeCounter=0;homeCounter<homeData.total_count;homeCounter++){
    switch(homeData.room[homeCounter].type){
      case 'room':{
        sitemap.add({url : '/rooms/' + homeData.room[homeCounter].id , img:[{url:'https://www.trypinn.com/' + homeData.room[homeCounter].preview}]});
        break;
      }
      case 'ecotourism':{
        sitemap.add({url : '/ecotourism/' + homeData.room[homeCounter].id });
      }
    }
  }
  sitemap.toXML( function(err, xml){ if (!err){} });
  var xml = sitemap.toString();
  console.log(xml);
});
}
