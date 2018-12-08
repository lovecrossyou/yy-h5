/**
 * Created by zhulizhe on 2018-12-08.
 */
import React from 'react';
import { connect } from 'dva';
import { List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import * as routerRedux from 'react-router-redux';
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
  };

  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <DocumentTitle title='商品'>

        <div>
          <List>
            <InputItem
              {...getFieldProps('pName')}
              clear
              placeholder="商品名称"
              ref={el => this.autoFocusInst = el}
            >商品名称</InputItem>
            <InputItem
              {...getFieldProps('originPrice')}
              type={type}
              placeholder="商品原价"
              clear
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >原价</InputItem>
            <InputItem
              {...getFieldProps('salePrice')}
              type={type}
              placeholder="商品售价"
              clear
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >现价</InputItem>

            <InputItem
              {...getFieldProps('autofocus')}
              clear
              placeholder=""
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
              extra=""
              arrow="horizontal"
              onClick={() => {
                this.props.dispatch(routerRedux.push('/settled/map'));
              }}
            >商品分类</Item>

            <Item
              extra=""
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
export default connect()(ProductEditWrapper);
