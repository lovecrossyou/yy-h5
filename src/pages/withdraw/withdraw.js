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


function DoWithDraw(props) {
  const { getFieldProps } = props.form;


  return <div>
    <div className={styles.withdraw_header}>
      <div className={styles.withdraw_content_title}>到账银行卡</div>
      <div className={styles.bank_wrapper}>
        <div className={styles.bank_name}>浦发银行（4703）</div>
        <div className={styles.time}>1个工作日内到账</div>
      </div>
      <div>
        <Icon type='right' color='#999999'></Icon>
      </div>
    </div>

    <div className={styles.withdraw_content}>

      <div className={styles.withdraw_amount}>
        提现金额
      </div>

      <div className={styles.input_wrapper}>
        <div className={styles.withdraw_rmb}>
          ¥
        </div>
        <InputItem
          {...getFieldProps('digit')}
          type="money"
          placeholder="提现数额"
          moneyKeyboardAlign="left"
          className={styles.input_bg}
        ></InputItem>
      </div>

      <div className={styles.footer}>
        <div className={styles.footer_remain}>余额¥25653.00，</div>
        <div className={styles.footer_total}>全部提现</div>
      </div>

      <div className={styles.withdraw_footer_btn}>
        <Button
          type="primary"
          onClick={() => {
            props.dispatch(routerRedux.push('/withdraw/withdraw'));
          }}>提现</Button>
      </div>
    </div>
  </div>;
}


const DoWithDrawWrapper = createForm()(DoWithDraw);

export default connect()(DoWithDrawWrapper);
