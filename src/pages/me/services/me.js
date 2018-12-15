/**
 * Created by zhulizhe on 2018-12-15.
 */

import request from "../../../utils/request";

export async function fetchLogin (params) {
  return request('/merchant/shop/user/login',{
    method:'post',
    body:params
  });
}
