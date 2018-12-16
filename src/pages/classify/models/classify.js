import { Toast} from 'antd-mobile';

import { fetchCategoryList ,fetchSecondCategory,productOfCategory} from '../service/classify';

export default {
  namespace: 'classify',
  state: {
    category_list:[],
    category_products:[]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/classify/page') {
          // setTokenFromQueryString(query);
          dispatch({
            type: 'categoryList',
            payload: {},
          });
        }
      });
    },
  },
  // 异步
  effects: {
    * categoryList({ payload, cb }, { call, put,select }) {
      const global = yield select(state => {
        return state.global;
      });
      const shopId = global.tokenInfo.shopId ;
      let res = yield call(fetchCategoryList, {
        id:shopId
      });
      if(res.status === '-1'){
        Toast.show(res.message);
        return;
      }

      // 左侧分类数据
      yield put({
        type: 'saveCategory',
        payload: res.data,
      });


      // 右侧数据
      res = yield call(productOfCategory,{
        id:shopId
      })
      if(res.status === '-1'){
        Toast.show(res.message);
        return;
      }

      console.log('右侧数据 ',res);
      yield put({
        type: 'saveCategoryProducts',
        payload: res.data,
      });
    },
  },
  // 同步
  reducers: {
    saveCategory(state, action) {
      return {
        ...state,
        category_list: action.payload };
    },

    saveCategoryProducts(state,action){
      return {
        ...state,
        category_products:action.payload
      }
    }
  },
};
