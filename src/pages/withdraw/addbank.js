/**
 * Created by zhulizhe on 2018-12-09.
 */


import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import { List, InputItem, WhiteSpace, Button, WingBlank, ImagePicker, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';

import money_icon from './images/qian@2x.png';
import styles from './page.css';


function AddBank(props) {
  const { getFieldProps } = props.form;


  return <div>
    <List renderHeader={() => '请绑定持卡人 本人的银行卡'}>
      <InputItem
        {...getFieldProps('cardowner', {
        })}
        placeholder="请输入持卡人"
      >持卡人</InputItem>


      <InputItem
        {...getFieldProps('bankCard', {
        })}
        placeholder="请输入卡号"

        type="bankCard"
      >卡号</InputItem>

      <InputItem
        {...getFieldProps('bankName', {
        })}
        placeholder="请输入银行名称"
      >银行名称</InputItem>

      <InputItem
        {...getFieldProps('phone')}
        type="phone"
        placeholder="手机号码"
      >手机号码</InputItem>

    </List>
      <div className={styles.withdraw_footer_btn}>
        <Button
          type="primary"
          onClick={() => {
            // props.dispatch(routerRedux.push('/withdraw/withdraw'));
          }}>完成</Button>
      </div>
  </div>
}


const AddBankWrapper = createForm()(AddBank);

export default connect()(AddBankWrapper);
