/**
 * Created by zhulizhe on 2018-12-15.
 */

import request from '../../../utils/request';

export async function fetchCreateShop(params){
  return request('/merchant/shop/create',{
    method:'post',
    body:params
  });
}
