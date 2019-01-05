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
        else if(pathname === '/marketing/addmanjian'){
            dispatch({
              type: 'global/setTitle', payload:'添加满减'
            });
        }
        else if(pathname === '/marketing/addfanquan'){
          dispatch({
            type: 'global/setTitle', payload:'添加返券'
          });
        }
        else if(pathname === '/marketing/addshoudan'){
          dispatch({
            type: 'global/setTitle', payload:'添加首单优惠券'
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
