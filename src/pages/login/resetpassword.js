import React from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {Button, WhiteSpace,InputItem,List} from 'antd-mobile';
import { createForm } from 'rc-form';
import DocumentTitle from 'react-document-title';

import styles from './page.less'

const TOTALSEC = 60 ;
class MobileLogin extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      timeString:'获取验证码',
      activeTimer:false,
      phoneNum:null,
      check_code_enable:true
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

  //倒计时
  startTick = ()=>{
    this.timer = setInterval(()=>{
      if(this.totalSec!=-1){
        this.setState({
          timeString:this.totalSec+'s',
          check_code_enable:false
        })
        this.totalSec-- ;

      }
      else {
        this.setState({
          timeString:'获取验证码',
          check_code_enable:true
        })

        this.resetTick();
      }
    },1000)
  }

  resetTick = ()=>{
    this.totalSec = TOTALSEC ;
    this.timer&&clearInterval(this.timer);
    this.setState({
      check_code_enable:true
    })
  }

  componentWillUnmount() {
    this.timer&&clearInterval(this.timer);
  }


  render() {
    const { getFieldProps } = this.props.form;
    return (
      <DocumentTitle title='重置密码'>
        <div>
          <List>
            <InputItem
              {...getFieldProps('phoneNum')}
              type={'phone'}
              value={this.state.phoneNum}
              placeholder="请输入手机号"
              onChange={phone=>{
                console.log(phone);
                this.setState({
                  phoneNum:phone
                })
              }}
              ref={el => this.autoFocusInst = el}
            >手机号</InputItem>

            <div className={styles.checkcode_wrapper}>
              <InputItem
                {...getFieldProps('checkCode')}
                clear
                placeholder="请输入验证码"
                ref={el => this.autoFocusInst = el}
              >验证码</InputItem>
              <div
                onClick={()=>{
                  if(!this.state.check_code_enable)return;
                  this.startTick();
                }}
                className={styles.btn_send}>{this.state.timeString}</div>
            </div>

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
                <Button type="primary" onClick={this.updateClick}>确认</Button>
              </List.Item>
            </div>
          </List>
        </div>
      </DocumentTitle>
      )
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
      <div className={styles.container}>
        {this.state.showLoginForm?(<MobileLoginWrapper/>):(<Button type="warning" style={{marginRight: '16px', marginLeft: '16px'}} onClick={this.loginByMobilePhone}>输入手机号登录</Button>)}
      </div>
    );
  }
}


export default connect()(Login);

