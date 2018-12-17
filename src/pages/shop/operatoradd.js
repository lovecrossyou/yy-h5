/**
 * Created by zhulizhe on 2018-12-16.
 */
import React from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import {Button, Picker, InputItem, List, Toast, Icon} from 'antd-mobile';
import {createForm} from 'rc-form';
import DocumentTitle from 'react-document-title';

import styles from './page.css'
import icon_left from './images/left.jpg'

const roleData = [{
  label: '店长',
  value: 'shop_manager'
}, {
  label: '管理员',
  value: 'simple_manager'
}]

class OperatorEdit extends React.Component {

  state = {
    roleName: 'simple_manager',
    avatar: null,
    roleName: null
  }

  handleClick = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
      if(error){
        Toast.show('请输入完整信息')
        return;
      }

      const avatar = this.state.avatar ;
      const rolename = this.state.roleName ;

      value.mobilePhone = value.mobilePhone.replace(/\s+/g,"") ;

      const params = {
        ...value,
        shopUserRole:rolename,
        icon:avatar
      }

      this.props.dispatch({
        type:'shop/userCreate',
        payload:params,
        cb:()=>{
          Toast.show('添加成功')
          router.goBack();
        }
      })
    });
  }

  render() {
    const {getFieldProps} = this.props.form;
    return <DocumentTitle title='角色添加'>
      <List renderHeader={() => ''}>
        <InputItem
          {...getFieldProps('cnName', {rules: [{required: true}]})}
          placeholder="请输入昵称"
        >昵称</InputItem>
        <InputItem
          {...getFieldProps('mobilePhone',{rules: [{required: true}]})}
          type="phone"
          placeholder="请输入手机号"
        >账号</InputItem>
        <InputItem
          {...getFieldProps('password',{rules: [{required: true}]})}
          type="password"
          placeholder="请输入密码"
        >密码</InputItem>
        <Picker
          data={roleData}
          cols={1}
          onOk={v => {
            this.setState({
              roleName: v[0]
            })
          }}
        >
          <List.Item arrow="horizontal">角色</List.Item>
        </Picker>

        <div
          className={styles.head_portrait}
          onClick={() => {

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
              this.props.dispatch({
                type: 'global/upload',
                payload: files[0],
                cb: url => {
                  this.setState({
                    avatar: url
                  })
                },
              });
            }}
          />
          <img src={this.state.avatar} className={styles.icon_name} alt=""/>
          <img className={styles.icon_name_left} src={icon_left} alt=""/>
      </span>
        </div>

        <div className={styles.btn_confirm}>
          <Button type="primary" onClick={this.handleClick}>确定</Button>
        </div>

      </List>
    </DocumentTitle>
  }
}


const OperatorEditWrapper = createForm()(OperatorEdit);

export default connect(state => {
  return {
    store: state.shop
  }
})(OperatorEditWrapper)
