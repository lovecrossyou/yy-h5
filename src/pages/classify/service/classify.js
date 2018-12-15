import request from '../../../utils/request';

export async function fetchCategoryList(params) {
  return request('/merchant/shop/productCategory/list',{
    method:'post',
    body:params
  });
}

export async function fetchSecondCategory(params) {
  return request('/discountProduct/secondCategory',{
    method:'post',
    body:params
  });
}

export async function productOfSecondCategory(params) {
  return request('/discountProduct/productOfSecondCategory',{
    method:'post',
    body:params
  });
}
