import { queryShopInfo } from '../services/shop';

export default {
  namespace: 'shop',
  state: {
    shopInfo:null
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/shop/page') {
          dispatch({
            type: 'fetch',
          });
          dispatch({
            type: 'global/setTitle', payload: {
              text: '登录',
            },
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
  },
  reducers: {
    saveShopInfo(state, action) {
      return { ...state, shopInfo:action.payload };
    },
  },
};        
