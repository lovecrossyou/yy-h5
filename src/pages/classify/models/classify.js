import { Toast} from 'antd-mobile';

import { fetchCategoryList ,fetchSecondCategory,productOfCategory} from '../service/classify';

export default {
  namespace: 'classify',
  state: {
    category_list:[],
    products:[],
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
        else if(pathname === '/classify/classify_detail'){
          const {id} = query ;
          dispatch({
            type: 'productOfCategory',
            payload: {
              secondCategoryId:id
            },
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
      const res = yield call(fetchCategoryList, {
        id:shopId
      });
      if(res.status === '-1'){
        Toast.show(res.message);
        return;
      }
      yield put({
        type: 'saveCategory',
        payload: res.data,
      });

      //继续请求第一个分类的内容
      // const selectCategory = list[0];
      // const second_category_list = yield call(fetchSecondCategory, {
      //   firstCategoryId:selectCategory.firstCategoryId
      // });
      // yield put({
      //   type: 'saveSecondCategory',
      //   payload: second_category_list,
      // });
    },


    * productOfCategory({ payload, cb }, { call, put }) {
      const res = yield call(productOfCategory, payload);
      if(res.status === '-1'){
        Toast.show(res.message);
        return;
      }
      yield put({
        type: 'saveProducts',
        payload: res.data,
      });
    },
  },
  // 同步
  reducers: {
    saveCategory(state, action) {
      return { ...state, category_list: action.payload };
    },

    saveProducts(state,action){
      return {
        ...state,
        products:action.payload
      }
    }
  },
};
