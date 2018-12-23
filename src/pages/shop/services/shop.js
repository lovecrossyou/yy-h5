import request from "../../../utils/request";

export async function queryShopInfo (params) {
  return request('/merchant/shop/info',{
    method:'post',
    body:params
  });
}

//

export async function queryUserList (params) {
  return request('/merchant/shop/user/list',{
    method:'post',
    body:params
  });
}

//
export async function queryUserCreate (params) {
  return request('/merchant/shop/user/create',{
    method:'post',
    body:params
  });
}

export async function queryUpdateShop (params) {
  return request('/merchant/shop/update',{
    method:'post',
    body:params
  });
}


export async function queryUpload(params) {
  return request('/upload',{
    method:'fileupload',
    body:params
  });
}

