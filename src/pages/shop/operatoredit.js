/**
 * Created by zhulizhe on 2018-12-16.
 */
import React from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {Button, WhiteSpace,InputItem,List,Toast,Icon} from 'antd-mobile';
import { createForm } from 'rc-form';
import DocumentTitle from 'react-document-title';

import styles from './page.css'
import icon_left from './images/left.jpg'

function OperatorEdit(props) {
  const { getFieldProps } = props.form;
  return <DocumentTitle title='角色编辑'>
    <List renderHeader={() => ''}>
      <InputItem
        {...getFieldProps('cName', {
        })}
      >昵称</InputItem>
      <InputItem
        {...getFieldProps('phone')}
        type="phone"
        placeholder=""
      >账号</InputItem>
      <InputItem
        {...getFieldProps('password')}
        type="password"
        placeholder="****"
      >密码</InputItem>

      <div className={styles.head_portrait} onClick={() => {
        // console.log('点击获取头像');
        // props.dispatch(routerRedux.push('/personInfo/userPicture'));
      }}>
        <span>头像</span>
        <span>
 <input
   className={styles.file}
   type="file"
   accept="image/*"
   onChange={(e) => {
     let files;
     if (e.dataTransfer) {
       files = e.dataTransfer.files;
     } else if (e.target) {
       files = e.target.files;
     }
     props.dispatch({
       type: 'personInfo/upload',
       payload: files[0],
       cb: () => {
         props.dispatch({
           type: 'personInfo/userInfo',
         });
       },
     });

   }}
 />
              <img className={styles.icon_name}  alt=""/>
              <img className={styles.icon_name_left} src={icon_left} alt=""/>
            </span>
      </div>
    </List>
  </DocumentTitle>
}

const OperatorEditWrapper = createForm()(OperatorEdit);

export default connect(state=>{
  return {
    store:state.shop
  }
})(OperatorEditWrapper)
