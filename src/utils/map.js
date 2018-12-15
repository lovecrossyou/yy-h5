/**
 * Created by zhulizhe on 2018-12-15.
 */
const fetch =  require('dva/fetch');

const AMAPKEY = '636cecc12ec156b92252622edecfa8f5';
const place_url = 'https://restapi.amap.com/v3/place/text?'

export const fetchPlace = async (keyword)=>{
  const city = '北京'
  const url = place_url + 'key='+AMAPKEY+'&keywords='+keyword+'&city='+city+'&children=1&offset=10&page=1&extensions=all'
  let opt = {
    method: 'get',
  };
  const response = await fetch(encodeURI(url),opt);
  return response.json();
}
