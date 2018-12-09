/**
 * Created by zhulizhe on 2018-12-09.
 */
import React from 'react';
import { routerRedux } from 'dva/router';
import {connect} from 'dva';

import {List, InputItem, WhiteSpace, Button, WingBlank, ImagePicker, Icon} from 'antd-mobile';
import {createForm} from 'rc-form';

import money_icon from './images/qian@2x.png'
import styles from './page.css'

const confirmClick = ()=>{

}

function WithDraw(props) {
  return <div>
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
      <Button type="primary" onClick={confirmClick}>完成</Button>
    </div>
  </div>
}

export default connect()(WithDraw)
