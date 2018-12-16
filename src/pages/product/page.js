/**
 * Created by zhulizhe on 2018-12-08.
 */
import React from 'react';
import { connect } from 'dva';
import { List, InputItem, WhiteSpace, Button,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';

import styles from './page.css';

const Item = List.Item;

// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}


class ProductEdit extends React.Component {

  state = {
    type: 'money',
  };


  saveFormData = (props)=>{
    if(props){
      const formData = this.props.store.formData ;
      const data = {
        ...formData,
        ...props
      }
      this.props.dispatch({
        type:'product/saveFormData',
        payload:data
      })

      console.log('data ',data);
      return;
    }
  }

  confirmClick = () => {
    let activeCategory = this.props.store.activeCategory ;
    let productImageUrls = this.props.store.productImageUrls ;
    let formData = this.props.store.formData ;

    console.log('store ',this.props.store);
    console.log('formData ',formData);

    const {headName,price,originalPrice,spec,stock} = formData ;
    if(headName=== null){
      Toast.show('请输入商品名称');
      return ;
    }
    if(price=== null){
      Toast.show('请输入商品价格');
      return ;
    }

    if(originalPrice=== null){
      Toast.show('请输入商品原价');
      return ;
    }

    if(spec=== null){
      Toast.show('请输入商品规格');
      return ;
    }

    if(stock=== null){
      Toast.show('请输入商品库存');
      return ;
    }

    if(activeCategory == null){
      Toast.show('请选择商品分类');
      return ;
    }

    if(productImageUrls.length===0){
      Toast.show('请上传商品图片');
      return ;
    }

    formData.price = parseFloat(formData.price)*100 ;
    formData.originalPrice = parseFloat(formData.originalPrice)*100 ;

    formData.listImage = productImageUrls[0] ;
    formData.headImage = productImageUrls[0] ;
    formData.detailImages = productImageUrls ;
    formData.categoryId = activeCategory.id ;
    formData.tag = '测试标签' ;

    console.log('formData ',formData);
    this.props.dispatch({
      type:'product/createProduct',
      payload: formData,
      cb:()=>{
        this.props.dispatch(routerRedux.goBack());
      }
    })
  };

  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    const {activeCategory,formData} = this.props.store;


    let that = this ;
    console.log('formData ',formData);
    return (
      <DocumentTitle title='商品'>
        <div>
          <List>
            <InputItem
              {...getFieldProps('headName',{
                rules: [{required: true}],
                onChange:v=>{
                  // console.log('商品名称 ',v);
                  that.saveFormData({
                    headName: v
                  });
                }
              })}
              clear
              placeholder="商品名称"
              defaultValue={formData.headName||''}
              ref={el => this.autoFocusInst = el}
            >商品名称</InputItem>
            <InputItem
              {...getFieldProps('originalPrice',{rules: [{required: true}],
                onChange:v=>{
                  // console.log('商品名称 ',v);
                  that.saveFormData({
                    originalPrice: v
                  });
                }})}
              type={type}
              placeholder="商品原价"
              clear
              defaultValue={formData.originalPrice||''}
              moneyKeyboardAlign="left"
              extra="¥"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >原价</InputItem>
            <InputItem
              {...getFieldProps('price',{rules: [{required: true}],
                onChange:v=>{
                  // console.log('商品名称 ',v);
                  that.saveFormData({
                    price: v
                  });
                }})}
              type={type}
              placeholder="商品售价"
              clear
              defaultValue={formData.price}
              extra="¥"
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >现价</InputItem>

            <InputItem
              {...getFieldProps('spec',{rules: [{required: true}],
                onChange:v=>{
                  // console.log('商品名称 ',v);
                  that.saveFormData({
                    spec: v
                  });
                }})}
              clear
              placeholder="规格 18L"
              defaultValue={formData.spec}

              ref={el => this.autoFocusInst = el}
            >商品规格</InputItem>

            <InputItem
              {...getFieldProps('stock',{rules: [{required: true}],
                onChange:v=>{
                  // console.log('商品名称 ',v);
                  that.saveFormData({
                    stock: v
                  });
                }})}
              type={type}
              placeholder="商品库存总量"
              clear
              defaultValue={formData.stock}
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >库存</InputItem>

            <Item
              extra={activeCategory?activeCategory.name:''}
              arrow="horizontal"
              onClick={() => {
                this.saveFormData();
                this.props.dispatch(routerRedux.push('/product/productcategory'));
              }}
            >商品分类</Item>

            <Item
              extra={formData.productDescribe}
              arrow="horizontal"
              onClick={() => {
                this.saveFormData();
                this.props.dispatch(routerRedux.push('/product/productsummary'));
              }}
            >商品描述</Item>

            <Item
              extra="商品图片"
              arrow="horizontal"
              onClick={() => {
                this.saveFormData();
                this.props.dispatch(routerRedux.push('/product/imagepicker'));
              }}
            >商品图片</Item>
            <WhiteSpace/>

          </List>

          <div className={styles.footer_btn}>
            <Button type="primary" onClick={this.confirmClick}>完成</Button>
          </div>
        </div>
      </DocumentTitle>

    );
  }
}

const ProductEditWrapper = createForm()(ProductEdit);

export default connect(state=>{
  return {
    store:state.product
  }
})(ProductEditWrapper);
