import React from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {Button, WhiteSpace,InputItem,List} from 'antd-mobile';
import { createForm } from 'rc-form';

import styles from './page.less'

const TOTALSEC = 60 ;
class MobileLogin extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      timeString:'获取验证码',
      activeTimer:false,
    }

    // 验证码倒计时
    this.timer = null ;
    this.totalSec = TOTALSEC ;
  }

  componentDidMount() {
    this.autoFocusInst.focus();
  }


  // 提交
  handleClick = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }


  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <List>
          <InputItem
            {...getFieldProps('phoneNum')}
            clear
            type={'phone'}
            placeholder="请输入手机号"
            ref={el => this.autoFocusInst = el}
          >手机号</InputItem>

          <InputItem
            {...getFieldProps('checkCode')}
            clear
            placeholder="请输入验证码"
            ref={el => this.autoFocusInst = el}
          >验证码</InputItem>

          <InputItem
            {...getFieldProps('password')}
            clear
            type="password"
            placeholder="****"
            ref={el => this.autoFocusInst = el}
          >输入密码</InputItem>
          <InputItem
            {...getFieldProps('password_confirm')}
            clear
            type="password"
            placeholder="****"
            ref={el => this.autoFocusInst = el}
          >再次输入密码</InputItem>


          <div className={styles.btn_confirm}>
            <List.Item>
              <Button type="primary" onClick={this.confirmClick}>确认</Button>
            </List.Item>
          </div>
        </List>
      </div>)
  }
}

const MobileLoginWrapper = createForm()(MobileLogin);


class Login extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      showLoginForm:true,
    }
  }

  loginByMobilePhone = ()=>{
    this.setState({
      showLoginForm:true
    })
  }

  render(){
    return (
      <div>
        <WhiteSpace/>
        {this.state.showLoginForm?(<MobileLoginWrapper/>):(<Button type="warning" style={{marginRight: '16px', marginLeft: '16px'}} onClick={this.loginByMobilePhone}>输入手机号登录</Button>)}
        <WhiteSpace/>
      </div>
    );
  }
}


export default connect()(Login);

