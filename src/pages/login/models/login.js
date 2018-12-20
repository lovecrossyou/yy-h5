import { Toast } from 'antd-mobile';

import { fetchLogin } from '../services/login';
import { setAccessToken } from '../../../utils/authority';

export default {
<<<<<<< HEAD
    namespace: 'login',
    state: {

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/login') {
                    dispatch({
                        type: 'fetch'
                    })
                    dispatch({
                        type:'global/setTitle',payload:'登录'
                      })
                }
            });
=======
  namespace: 'login',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/login') {
          dispatch({
            type: 'fetch',
          });
          dispatch({
            type: 'global/setTitle', payload: {
              text: '登录',
            },
          });
>>>>>>> 4ec0723365c4fb4a880bba5d7d6dff6f34b3e7c4
        }
      });
    },
  },
  effects: {
    * login({ payload, cb }, { call, put }) {
      const res = yield call(fetchLogin, payload);
      if (res.status === '-1') {
        Toast.show(res.message);
      } else {
        //保存用户信息
        setAccessToken(res.data);
        cb && cb();
      }
    },

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
<<<<<<< HEAD
};
=======
  },
};        
>>>>>>> 4ec0723365c4fb4a880bba5d7d6dff6f34b3e7c4
