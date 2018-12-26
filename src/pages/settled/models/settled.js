/**
 * Created by zhulizhe on 2018-12-15.
 */
import { Toast} from 'antd-mobile';
import { fetchCreateShop } from '../services/settle';
import { fetchPlace } from '../../../utils/map';

export default {
  namespace: 'settled',
  state: {
    addrList:[],
    //店铺入驻参数
    shopParamInfo:{
      locationInfo:{}
    },
    productImageUrls:[]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/settled/page') {
          dispatch({
            type: 'fetch',
          })
          dispatch({
            type: 'global/setTitle', payload:'入驻'
          });
        }
        else if (pathname === '/settled/map') {
          dispatch({
            type: 'global/setTitle', payload:'地址搜索'
          });
        }
      });
    }
  },
  effects: {
    *fetch({ payload ,cb}, { call, put }) {
      // const res = yield call(fetchCreateShop,payload);
    },

    // 创建店铺
    *createShop({payload,cb},{call,put}){
      const res = yield call(fetchCreateShop,payload);
      if(res.status === '-1'){
        Toast.show(res.message);
        return;
      }
      else {
        Toast.show('创建成功');
        cb&&cb();
      }
    },

    *searchPlace({payload},{call,put}){
      const res = yield call(fetchPlace,payload);
      yield put({
        type:'saveAddressList',
        payload:res.pois
      })
    }

  },
  reducers: {
    save(state, action) {
      return { ...state, list:action.payload };
    },

    saveAddressList(state,action){
      return {
        ...state,
        addrList: action.payload
      }
    },

    saveProductImageUrl(state, action) {
      const imgUrl = action.payload ;
      let imgUrls = state.productImageUrls ;
      imgUrls.push(imgUrl);

      console.log('imgUrls ',imgUrls)
      return { ...state,
        productImageUrls: imgUrls };
    },

    removeImageUrl(state,action){
      let imgUrls = state.productImageUrls ;
      const index = parseInt(action.payload) ;
      imgUrls = imgUrls.slice(index,1);
      return { ...state,
        productImageUrls: imgUrls };
    },

    saveLocationInfo(state,action){
      let shopParamInfo = state.shopParamInfo ;
      return {
        ...state,
        shopParamInfo:{
          ...shopParamInfo,
          locationInfo:action.payload
        }
      }
    },

    saveShopParamInfo(state,action){
      return {
        ...state,
        shopParamInfo:action.payload
      }
    }
  },
};
