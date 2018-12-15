import request from "../../../utils/request";

export async function queryShopInfo (params) {
  return request('/merchant/shop/info',{
    method:'post',
    body:params
  });
}
