// 店铺相关
const shopTypeData = [{
  label: '水站',
  value: 'water_store'
}, {
  label: '便利店',
  value: 'convenience_store'
}]
const getShopTye = shopName=>{
  for(var shop of shopTypeData){
    if(shop.label === shopName){
      return shop.value ;
    }
  }
  return null ;
}

const isMock = false;
const baseUrlPrefix = '/h5';

module.exports = {
  name: 'dva-umi-mobile',
  apiPrefix: baseUrlPrefix,
  openPages: ['/points/page','/login/page','/404','/productlist/page','/productlist/ProductDetail'],
  isMock:isMock,
  getShopTye:getShopTye,
  shopTypeData:shopTypeData
}

