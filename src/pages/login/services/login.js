import request from "../../../utils/request";

export async function fetchLogin (params) {
  return request('/merchant/shop/user/login',{
    method:'post',
    body:params
  });
}
