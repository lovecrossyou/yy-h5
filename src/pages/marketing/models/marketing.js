import { Toast } from 'antd-mobile';


export default {
  namespace: 'marketing',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/marketing/page') {
          dispatch({
            type: 'fetch',
          });
          dispatch({
            type: 'global/setTitle', payload:'营销管理'
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
