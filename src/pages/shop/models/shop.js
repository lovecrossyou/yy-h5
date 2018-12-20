import {Toast} from 'antd-mobile';
import {queryShopInfo, queryUpdateShop, queryUserCreate, queryUserList} from '../services/shop';
import {getShopTye} from "../../../utils/config";

export default {
  namespace: 'shop',
  state: {
    userList: [],
    //店铺入驻参数
    shopParamInfo: {
      locationInfo: {}
    },
    productImageUrls: []
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/shop/page') {
          dispatch({
            type: 'fetch',
          });
          dispatch({
            type: 'global/setTitle', payload: '店铺详情',
          });
        }
        else if (pathname === '/shop/operatormgr') {
          dispatch({
            type: 'userList',
          });
          dispatch({
            type: 'global/setTitle', payload: '员工列表',
          });
        }
      });
    },
  },
  effects: {
    * fetch({payload}, {call, put, select}) {
      const global = yield select(state => {
        return state.global;
      });
      const res = yield call(queryShopInfo, {
        sn: global.tokenInfo.shopSn
      });
      yield put({
        type: 'saveShopInfo',
        payload: res.data
      })
    },

    * update({payload,cb}, {call, put, select}) {

      const global = yield select(state => {
        return state.global;
      });

      const res = yield call(queryUpdateShop,{
        ...payload,
        id: global.tokenInfo.shopId
      }) ;
      if (res.status === '-1') {
        Toast.show(res.message);
        return;
      }
      cb && cb();
    },

    * userList({payload}, {call, put, select}) {
      const global = yield select(state => {
        return state.global;
      });
      const res = yield call(queryUserList, {
        id: global.tokenInfo.shopId
      });
      yield put({
        type: 'saveUserList',
        payload: res.data
      })
    },

    * userCreate({payload, cb}, {call, put, select}) {
      const global = yield select(state => {
        return state.global;
      });
      const res = yield call(queryUserCreate, {
        ...payload,
        shopId: global.tokenInfo.shopId
      });

      if (res.status === '-1') {
        Toast.show(res.message);
        return;
      }
      cb && cb();
    }
  },
  reducers: {
    saveShopInfo(state, action) {
      // name:shopParamInfo.name,
      //   imageUrl:shopParamInfo.imageUrl,
      //   telephone:shopParamInfo.telephone,
      //   adminName:shopParamInfo.adminName,
      //   adminMobilePhone:shopParamInfo.adminMobilePhone,
      //   presentation:shopParamInfo.presentation,

      const shopTypeName = getShopTye(action.payload.shopType);
      return {
        ...state,
        shopParamInfo: {
          ...state.shopParamInfo,
          ...action.payload,
          shopType: [shopTypeName]
        }
      };
    },
    saveUserList(state, action) {
      return {...state, userList: action.payload};
    },


    saveProductImageUrl(state, action) {
      let shopParamInfo = state.shopParamInfo;

      const imgUrl = action.payload;
      let imgUrls = state.productImageUrls;
      imgUrls.push(imgUrl);
      // shopDetailImage
      console.log('imgUrls ', imgUrls)
      return {
        ...state,
        productImageUrls: imgUrls,
        shopParamInfo: {
          ...shopParamInfo,
          shopDetailImage: imgUrls
        }
      };
    },

    removeImageUrl(state, action) {
      let shopParamInfo = state.shopParamInfo;
      let imgUrls = state.productImageUrls;
      const index = parseInt(action.payload);
      imgUrls = imgUrls.slice(index, 1);
      return {
        ...state,
        productImageUrls: imgUrls,
        shopParamInfo: {
          ...shopParamInfo,
          shopDetailImage: imgUrls
        }
      };
    },

    saveLocationInfo(state, action) {
      let shopParamInfo = state.shopParamInfo;
      return {
        ...state,
        shopParamInfo: {
          ...shopParamInfo,
          locationInfo: action.payload
        }
      }
    },

    saveShopParamInfo(state, action) {
      return {
        ...state,
        shopParamInfo: action.payload
      }
    }
  },

};
