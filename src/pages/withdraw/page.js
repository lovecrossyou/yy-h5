/**
 * Created by zhulizhe on 2018-12-09.
 */
import React from 'react';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import DocumentTitle from 'react-document-title';

import {List, InputItem, WhiteSpace, Button, WingBlank, ImagePicker, Icon} from 'antd-mobile';
import {createForm} from 'rc-form';

import money_icon from './images/qian@2x.png'
import styles from './page.css'

function WithDraw(props) {
  return <DocumentTitle title='提现'>
    <div className='global_container'>
      <div className={styles.header}>
        <img src={money_icon} alt="" className={styles.money_icon}/>
        <div className={styles.remain_amount}>
          余额
        </div>
        <div className={styles.amount}>
          2553.00
        </div>
      </div>
      <div className={styles.footer_btn}>
        <Button
          type="primary"
          onClick={() => {
            props.dispatch(routerRedux.push('/withdraw/withdraw'))
          }}>提现</Button>
      </div>
    </div>
  </DocumentTitle>
}

export default connect()(WithDraw)
