import sm from 'sitemap';
var sitemap = sm.createSitemap ({
       hostname: 'http://www.tripinn.ir',
       cacheTime: 600000
     });

export const generateSiteMap=()=>{

  sitemap.add('/search/هر جا');
  sitemap.add('/search/کیش');
  sitemap.add('/search/نوشهر');
  sitemap.add('/search/گیلان');
  sitemap.add('/search/مازندران');
  sitemap.add('/search/اصفهان');
  sitemap.add('/search/فارس');
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
        sitemap.add('/rooms/' + homeData.room[homeCounter].id);
        break;
      }
      case 'ecotourism':{
        sitemap.add('/ecotourism/' + homeData.room[homeCounter].id);
      }
    }
  }
  sitemap.toXML( function(err, xml){ if (!err){} });
  var xml = sitemap.toString();
  console.log(xml);
});
}
