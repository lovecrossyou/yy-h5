/**
 * Created by zhulizhe on 2018-12-08.
 */
import React from 'react';
import { connect } from 'dva';
import { List, InputItem, WhiteSpace, Button } from 'antd-mobile';
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

  componentDidMount() {
    // this.autoFocusInst.focus();
  }

  handleClick = () => {
    this.inputRef.focus();

    //
    // "headName": "分类2商品",
    //   "price": 1000,
    //   "originalPrice": 20000,
    //   "tag": "标签",
    //   "spec": "规格 18L",
    //   "brand": "品牌",
    //   "productDescribe": "商品描述",
    //   "categoryId": 2,
    //   "listImage": "2222",
    //   "headImage": "23232",
  };

  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    const {activeCategory,productDescribe} = this.props.store;
    return (
      <DocumentTitle title='商品'>

        <div>
          <List>
            <InputItem
              {...getFieldProps('headName')}
              clear
              placeholder="商品名称"
              ref={el => this.autoFocusInst = el}
            >商品名称</InputItem>
            <InputItem
              {...getFieldProps('originalPrice')}
              type={type}
              placeholder="商品原价"
              clear
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >原价</InputItem>
            <InputItem
              {...getFieldProps('price')}
              type={type}
              placeholder="商品售价"
              clear
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >现价</InputItem>

            <InputItem
              {...getFieldProps('spec')}
              clear
              placeholder="规格 18L"
              ref={el => this.autoFocusInst = el}
            >商品规格</InputItem>

            <InputItem
              {...getFieldProps('volume')}
              type={type}
              placeholder="商品库存总量"
              clear
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >库存</InputItem>

            <Item
              extra={activeCategory?activeCategory.name:''}
              arrow="horizontal"
              onClick={() => {
                this.props.dispatch(routerRedux.push('/product/productcategory'));
              }}
            >商品分类</Item>

            <Item
              extra={productDescribe?productDescribe:''}
              arrow="horizontal"
              onClick={() => {
                this.props.dispatch(routerRedux.push('/product/productsummary'));
              }}
            >商品描述</Item>

            <Item
              extra="商品图片"
              arrow="horizontal"
              onClick={() => {
                this.props.dispatch(routerRedux.push('/settled/imagepicker'));
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
