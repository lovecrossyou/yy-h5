/**
 * Created by zhulizhe on 2018-12-08.
 */
import React from 'react';
import { connect } from 'dva';
import { List, InputItem, Toast, Button } from 'antd-mobile';
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
    type: 'number',
  };

  componentDidMount() {
    // this.autoFocusInst.focus();
  }

  handleClick = () => {
    this.props.form.validateFields((error, value) => {
      const {name,sortValue} = value ;

      if(name==undefined||name==''){
        Toast.show('请输入分类名称')
        return;
      }
      if(sortValue==undefined){
        value.sortVal = 1 ;
      }
      console.log(error, value);
      this.props.dispatch({
        type:'product/categoryCreate',
        payload:value,
        cb:()=>{
          this.props.dispatch(routerRedux.goBack());
        }
      })
    });
  };


  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <DocumentTitle title='添加分类'>
        <div className='global_container'>
          <List>
            <InputItem
              {...getFieldProps('name')}
              clear
              placeholder="请填写分类名称"
              ref={el => this.autoFocusInst = el}
            >分类名称</InputItem>
            <InputItem
              {...getFieldProps('sortVal')}
              type={type}
              placeholder="请填写数字（选填）"
              clear
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >排序</InputItem>
          </List>

          <div className={styles.footer_btn}>
            <Button type="primary" onClick={this.handleClick}>完成</Button>
          </div>
        </div>
      </DocumentTitle>

    );
  }
}

const ProductEditWrapper = createForm()(ProductEdit);
export default connect()(ProductEditWrapper);
