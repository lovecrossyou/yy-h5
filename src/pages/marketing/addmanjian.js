/**
 * Created by zhulizhe on 2019-01-05.
 */
import React from 'react';

import { connect } from 'dva';
import { List, InputItem, DatePicker, Button,WingBlank,Flex } from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import { routerRedux } from 'dva/router';
import router from 'umi/router';
import { createForm } from 'rc-form';
import styles from './page.css';

const strategys = [1,2] ;


const StrategyItem = ({getFieldProps})=>{
  const type = 'money';
  return <div>
    <WingBlank>
      <div className={styles.strategy_wrapper}>
        <InputItem
          {...getFieldProps('man')}
          type={type}
          placeholder="请填写金额"
          clear
          moneyKeyboardAlign="left"
        >消费满</InputItem>
        <InputItem
          {...getFieldProps('jian')}
          type={type}
          placeholder="请填写金额"
          clear
          moneyKeyboardAlign="left"
        >减</InputItem>
      </div>
    </WingBlank>
  </div>
}


function Manjian(props) {
  const { getFieldProps } = props.form;
  return <DocumentTitle title='满减活动'>
    <div className='global_container'>
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

        <div className={styles.btn_add_wrapper}>
          <div className={styles.btn_wrapper}>
            添加
          </div>
        </div>
        <StrategyItem getFieldProps={getFieldProps}/>
        <div className={styles.footer_btn}>
          <div>
            <Button
              type="primary"
              onClick={() => {

              }}>完成</Button>
          </div>
        </div>
      </List>
    </div>
  </DocumentTitle>;
}

const ManjianWrapper = createForm()(Manjian);

export default connect()(ManjianWrapper);
