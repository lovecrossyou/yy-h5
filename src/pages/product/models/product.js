import { Toast} from 'antd-mobile';
import { fetchCategoryList ,fetchCategoryListCreate,fetchProductCreate} from '../services/product';


export default {
  namespace: 'product',
  state: {
    category_list:[],
    activeCategory:null,
    productDescribe:null
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/product/productcategory') {
          console.log('请求分类列表')
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
    },

    * categoryCreate({payload,cb},{call,select}){
      const global = yield select(state => {
        return state.global;
      });
      const shopId = global.tokenInfo.shopId ;
      const res = yield call(fetchCategoryListCreate,{...payload,shopId:shopId});
      if(res.status === '-1'){
        Toast.show(res.message);
        return;
      }
      else {
        Toast.show('创建成功');
        cb&&cb();
      }
    },

    * createProduct({payload,cb},{call,select}){
      const global = yield select(state => {
        return state.global;
      });
      const shopId = global.tokenInfo.shopId ;

      const res = yield call(fetchProductCreate,{...payload,shopId:shopId});
      if(res.status === '-1'){
        Toast.show(res.message);
        return;
      }
      else {
        Toast.show('创建成功');
        cb&&cb();
      }
    }

  },
  // 同步
  reducers: {
    saveCategory(state, action) {
      return { ...state, category_list: action.payload };
    },

    saveActiveCategory(state, action) {
      return { ...state, activeCategory: action.payload };
    },

    saveSummary(state, action) {
      return { ...state, productDescribe: action.payload };
    },
  },
};
