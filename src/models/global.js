import uploadFile from '../utils/qiniu';
import {routerRedux} from 'dva/router';
import {getAccessToken} from '../utils/authority';
import {Toast} from 'antd-mobile';

export default {
  namespace: "global",
  state: {
    text: "",
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
            });

            //请求店铺信息
            dispatch({
              type:'shop/fetch',
              payload:{}
            })
          }
        }
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
      Toast.hide();
      cb && cb(res);
    },
  }
};
