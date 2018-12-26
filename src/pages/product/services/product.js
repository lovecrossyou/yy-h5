/**
 * Created by zhulizhe on 2018-12-15.
 */

import request from "../../../utils/request";

// 获取分类列表
export async function fetchCategoryList(params) {
  return request('/merchant/shop/productCategory/list',{
    method:'post',
    body:params
  });
}

// 创建分类
export async function fetchCategoryListCreate(params) {
  return request('/merchant/shop/productCategory/create',{
    method:'post',
    body:params
  });
}

// 创建商品
export async function fetchProductCreate(params) {
  return request('/merchant/shop/createProduct',{
    method:'post',
    body:params
  });
}

// 编辑商品
export async function fetchProductEdit(params) {
  return request('/merchant/shop/editProduct',{
    method:'post',
    body:params
  });
}
