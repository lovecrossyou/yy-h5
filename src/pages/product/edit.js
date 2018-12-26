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

      this.props.form.setFieldsValue({
        headName: formData.headName,
        price: formData.price,
        originalPrice: formData.originalPrice,
        spec: formData.spec,
        productDescribe: formData.productDescribe,
      }, () => console.log('after'));
      console.log('before');
    }
  }

  confirmClick = () => {
    const {category_list,categoryIndex} = this.props.classify ;
    const category = category_list[categoryIndex] ;
    let formData = this.props.store.formData ;
    formData.activeCategory = category ;
    console.log('formData ',formData);

    const {headName,price,originalPrice,spec,stock,detailImages,productDescribe,activeCategory} = formData ;
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

    if(detailImages.length===0){
      Toast.show('请上传商品图片');
      return ;
    }

    formData.price = parseFloat(formData.price) ;
    formData.originalPrice = parseFloat(formData.originalPrice) ;

    formData.listImage = detailImages[0] ;
    formData.headImage = detailImages[0] ;



    formData.categoryId = activeCategory.id ;
    formData.tag = '测试标签' ;

    console.log('this.props.store ',this.props.store);
    return;
    this.props.dispatch({
      type:'product/editProduct',
      payload: formData,
      cb:()=>{
        this.props.dispatch(routerRedux.goBack());
      }
    })
  };

  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    const {formData} = this.props.store;
    const {productDescribe} = formData ;

    const {category_list,categoryIndex} = this.props.classify ;
    const activeCategory = category_list[categoryIndex] ;

    let that = this ;
    console.log('formData ',formData);
    return (
      <DocumentTitle title='编辑商品'>
        <div className='global_container'>
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
                this.props.dispatch(routerRedux.push('/product/productsummary?summary='+productDescribe||''));
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
    store:state.product,
    classify:state.classify
  }
})(ProductEditWrapper);
