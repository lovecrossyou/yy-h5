import { Toast} from 'antd-mobile';

import { fetchLogin } from '../services/login';
import { setAccessToken } from '../../../utils/authority';

export default {
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
