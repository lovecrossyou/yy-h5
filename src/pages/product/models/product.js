import {Toast} from 'antd-mobile';
import {fetchCategoryList, fetchCategoryListCreate, fetchProductCreate, fetchProductEdit} from '../services/product';


export default {
  namespace: 'product',
  state: {
    category_list: [],
    activeCategory: null,
    // 上传商品的参数
    formData: {
      headName: null,
      price: null,
      originalPrice: null,
      spec: null,
      stock: null,
      detailImages: []
    },
    productImageUrls: [],
    // 商品描述
    summary: ''
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/product/productcategory') {
          console.log('请求分类列表')
          dispatch({
            type: 'categoryList',
            payload: {},
          });
          dispatch({
            type: 'global/setTitle', payload: '分类'
          });
        } else if (pathname === '/product/productsummary') {
          dispatch({
            type: 'global/setTitle', payload: '商品描述'
          });

          dispatch({
            type: 'saveSummary',
            payload: query.summary
          })
        } else if (pathname === '/product/categoryadd') {
          dispatch({
            type: 'global/setTitle', payload: '添加分类'
          });
        } else if (pathname === '/product/edit') {
          dispatch({
            type: 'global/setTitle', payload: '商品编辑'
          });
        }
      });
    },
  },
  // 异步
  effects: {
    * categoryList({payload, cb}, {call, put, select}) {
      const global = yield select(state => {
        return state.global;
      });
      const shopId = global.tokenInfo.shopId;
      const res = yield call(fetchCategoryList, {
        id: shopId
      });
      if (res.status === '-1') {
        Toast.show(res.message);
        return;
      }
      yield put({
        type: 'saveCategory',
        payload: res.data,
      });
    },

    * categoryCreate({payload, cb}, {call, select}) {
      const global = yield select(state => {
        return state.global;
      });
      const shopId = global.tokenInfo.shopId;
      const res = yield call(fetchCategoryListCreate, {...payload, shopId: shopId});
      if (res.status === '-1') {
        Toast.show(res.message);
        return;
      } else {
        Toast.show('创建成功');
        cb && cb();
      }
    },

    * createProduct({payload, cb}, {call, select}) {
      const global = yield select(state => {
        return state.global;
      });
      const shopId = global.tokenInfo.shopId;

      const res = yield call(fetchProductCreate, {...payload, shopId: shopId});
      if (res.status === '-1') {
        Toast.show(res.message);
        return;
      } else {
        Toast.show('创建成功');
        cb && cb();
      }
    },

    //编辑商品
    * editProduct({payload, cb}, {call}) {
      const res = yield call(fetchProductEdit, payload);
      if (res.status === '-1') {
        Toast.show(res.message);
        return;
      } else {
        Toast.show('更新成功');
        cb && cb();
      }
    }

  },
  // 同步
  reducers: {
    saveCategory(state, action) {
      return {...state, category_list: action.payload};
    },

    saveActiveCategory(state, action) {
      return {...state, activeCategory: action.payload};
    },


    saveFormData(state, action) {
      return {...state, formData: action.payload};
    },

    saveProductImageUrl(state, action) {
      const imgUrl = action.payload;
      let imgUrls = state.productImageUrls;
      imgUrls.push(imgUrl);

      console.log('imgUrls ', imgUrls)
      return {
        ...state,
        productImageUrls: imgUrls
      };
    },

    removeImageUrl(state, action) {
      let imgUrls = state.productImageUrls;
      const index = parseInt(action.payload);
      imgUrls = imgUrls.slice(index, 1);
      return {
        ...state,
        productImageUrls: imgUrls
      };
    },

    saveSummary(state, action) {
      return {
        ...state,
        summary: action.payload
      }
    },

    // 添加图片
    addPicture(state, action) {
      const picUrl = action.payload;
      const formData = state.formData;
      let detailImages = formData.detailImages;
      detailImages = detailImages.push({
        url: picUrl
      })
      return {
        ...state,
        formData: {...formData,detailImages}
      };
    },

    // 保存图片
    savePictures(state, action) {
      const detailImages = action.payload;
      const formData = state.formData;
      return {
        ...state,
        formData: {...formData,detailImages}
      };
    },

    // 删除图片
    removePictureAtIndex(state, action) {
      const formData = state.formData;
      let detailImages = Object.assign([],formData.detailImages);
      const index = parseInt(action.payload);
      detailImages = detailImages.slice(index, 1);

      console.log('detailImages ',detailImages);
      return {
        ...state,
        formData: {...formData,detailImages}
      };
    }
  },
};
