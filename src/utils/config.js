const isMock = false;
const baseUrlPrefix = isMock?'/api':'';
module.exports = {
  isMock:isMock,
  name: 'dva-umi-mobile',
  apiPrefix: baseUrlPrefix,
  openPages: ['/login/page','/404','/productlist/page','/productlist/ProductDetail']
}
