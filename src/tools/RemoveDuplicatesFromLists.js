export function removeDuplicatesFromList(list) {
  var obj = {};
  for ( var i=0; i < list.length; i++ )
      obj[list[i]['name']] = list[i];

  list= new Array();
  for ( var key in obj )
      list.push(obj[key]);
  return list;
}
