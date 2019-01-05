/**
 * Created by zhulizhe on 2019-01-05.
 */
/**
 * Created by zhulizhe on 2019-01-05.
 */
import React from 'react';

import {connect} from "dva";
import { List, InputItem, DatePicker,Button } from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import { routerRedux } from 'dva/router';
import router from 'umi/router';
import { createForm } from 'rc-form';
import styles from './page.css';



function Fanquan(props) {
  const { getFieldProps } = props.form;
  return <div className='global_container'>
    <List renderHeader={() => '满减活动'}>
      <InputItem
        {...getFieldProps('autofocus')}
        clear
        placeholder="请输入活动名称"
      >活动名称</InputItem>
      <DatePicker
        {...getFieldProps('dp', {
          rules: [
            { required: true, message: 'Must select a date' },
          ],
        })}
      >
        <List.Item arrow="horizontal">开始时间</List.Item>
      </DatePicker>
      <DatePicker
        {...getFieldProps('dp', {
          rules: [
            { required: true, message: 'Must select a date' },
          ],
        })}
      >
        <List.Item arrow="horizontal">结束时间</List.Item>
      </DatePicker>
      <div className={styles.footer_btn}>
        <Button
          type="primary"
          onClick={()=>{

          }}>完成</Button>
      </div>
    </List>
  </div>
}

const FanquanWrapper = createForm()(Fanquan);

export default connect()(FanquanWrapper)
