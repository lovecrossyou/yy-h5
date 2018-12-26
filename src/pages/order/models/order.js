import { Toast } from 'antd-mobile';

export default {
  namespace: 'order',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/order/page') {
          dispatch({
            type: 'fetch',
          });
          dispatch({
            type: 'global/setTitle', payload:'订单详情'
          });
        }
      });
    },
  },
  effects: {
    * login({ payload, cb }, { call, put }) {

    },

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
