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
    type: 'number',
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
      <DocumentTitle title='添加分类'>

        <div>
          <List>
            <InputItem
              {...getFieldProps('cName')}
              clear
              placeholder="请填写分类名称"
              ref={el => this.autoFocusInst = el}
            >分类名称</InputItem>
            <InputItem
              {...getFieldProps('sort')}
              type={type}
              placeholder="请填写数字（选填）"
              clear
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >排序</InputItem>
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
