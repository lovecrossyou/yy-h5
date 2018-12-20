import { Toast} from 'antd-mobile';
import {queryShopInfo, queryUserCreate, queryUserList} from '../services/shop';

export default {
  namespace: 'shop',
  state: {
    shopInfo:null,
    userList:[]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/shop/page') {
          dispatch({
            type: 'fetch',
          });
          dispatch({
            type: 'global/setTitle', payload: '店铺详情',
          });
        }
        else if(pathname=== '/shop/operatormgr'){
          dispatch({
            type: 'userList',
          });
        }
      });
    },
  },
  effects: {
    * fetch({ payload }, { call, put,select }) {
      const global = yield select(state => {
        return state.global;
      });
      const res = yield call(queryShopInfo,{
        sn:global.tokenInfo.shopSn
      });
      yield put({
        type:'saveShopInfo',
        payload:res.data
      })
    },

    * userList({ payload }, { call, put,select }) {
      const global = yield select(state => {
        return state.global;
      });
      const res = yield call(queryUserList, {
        id: global.tokenInfo.shopId
      });
      yield put({
        type: 'saveUserList',
        payload: res.data
      })
    },

    * userCreate({payload,cb},{call,put,select}){
      const global = yield select(state => {
        return state.global;
      });
      const res = yield call(queryUserCreate, {
        ...payload,
        shopId: global.tokenInfo.shopId
      });

      if(res.status === '-1'){
        Toast.show(res.message);
        return;
      }
      cb&&cb();
    }
  },
  reducers: {
    saveShopInfo(state, action) {
      return { ...state, shopInfo:action.payload };
    },
    saveUserList(state, action) {
      return { ...state, userList:action.payload };
    },
  },
};
