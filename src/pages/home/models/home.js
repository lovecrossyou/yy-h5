import { Toast} from 'antd-mobile';

import { setAccessToken } from '../../../utils/authority';

export default {
  namespace: 'home',
  state: {

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({
            type: 'fetch'
          })
          dispatch({
            type:'global/setTitle',
            payload:'首页'
          })
        }
      });
    }
  },
  effects: {
    *login({ payload,cb }, { call, put }) {
      const res = yield call(fetchLogin,payload);
      if(res.status === '-1'){
        Toast.show(res.message);
      }
      else {
        //保存用户信息
        setAccessToken(res.data);
        cb&&cb();
      }
    },

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
