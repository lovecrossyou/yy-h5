import uploadFile from '../utils/qiniu';
import {routerRedux} from 'dva/router';
import {getAccessToken} from '../utils/authority';

export default {
  namespace: "global",
  state: {
    text: "x",
    tokenInfo: null,
    loading: false,
    selectedTab: 'HomeTab'
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query, search}) => {
        console.log('pathname ', pathname);
        if (pathname === '/') {
          const tokenInfo = getAccessToken();
          console.log('tokenInfo ', tokenInfo)
          if (tokenInfo === '') {
            dispatch(routerRedux.push('/login/page'));
          }
          else {
            dispatch({
              type: 'saveToken',
              payload: tokenInfo
            })
          }
        }
        dispatch({
          type: "setText",
          payload:'首页'
        });
      });
    }
  },
  reducers: {
    saveToken(state, action) {
      return {...state, tokenInfo: action.payload};
    },

    setText(state, {payload}) {
      return {
        ...state,
        text: payload
      };
    },

    saveTabName(state, {payload}) {
      return {
        ...state,
        selectedTab: payload
      }
    }
  },
  effects: {
    * setTitle({payload}, {call, put, select}) {
      yield put({type: "setText", payload: payload});
    },

    // 上传图片
    * upload({payload, cb}, {call, put, select}) {
      Toast.loading('上传中',0);
      const res = yield uploadFile(payload, progress => {
        console.log('progress ', progress)
      });
      cb && cb(res);
    },
  }
};
