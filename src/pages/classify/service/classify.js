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

export async function productOfCategory(params) {
  return request('/merchant/shop/productListWithCategory',{
    method:'post',
    body:params
  });
}
