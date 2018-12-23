import { Toast } from 'antd-mobile';

export default {
  namespace: 'withdraw',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/withdraw/page') {
          dispatch({
            type: 'fetch',
          });
          dispatch({
            type: 'global/setTitle', payload:'提现'
          });
        }
      });
    },
  },
  effects: {
    * fetch({ payload, cb }, { call, put }) {
    },

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
