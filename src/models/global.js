import uploadFile from '../utils/qiniu';
import { routerRedux } from 'dva/router';
import { getAccessToken } from '../utils/authority';

export default {
  namespace: "global",
  state: {
    text: "",
    tokenInfo:null,
    loading:false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query, search }) => {
        console.log('pathname ',pathname);
        if(pathname === '/'){
          const tokenInfo = getAccessToken();
          console.log('tokenInfo ',tokenInfo)
          if(tokenInfo===''){
            dispatch(routerRedux.push('/login/page'));
          }
          else {
            dispatch({
              type:'saveToken',
              payload: tokenInfo
            })
          }
        }
        dispatch({
          type: "fetch"
        });
      });
    }
  },
  reducers: {
    saveToken(state, action) {
      return { ...state, tokenInfo:action.payload };
    },

    setText(state, { payload }) {
      return {
        ...state,
        text: payload
      };
    }
  },
  effects: {
    *setTitle({ payload }, { call, put, select }) {
      yield put({ type: "save", payload: payload });
    },

    // 上传图片
    *upload({ payload, cb }, { call, put, select }) {
      const res = yield uploadFile(payload,progress=>{
        console.log('progress ',progress)
      });
      // cb&&cb(res);
    }
  }
};
