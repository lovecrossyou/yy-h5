import React from 'react';
import {connect} from 'dva';
import {Button, WhiteSpace,InputItem,List} from 'antd-mobile';
import { createForm } from 'rc-form';

const bgUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535982564716&di=27ec1f5e867631a13e971042fc8064b9&imgtype=0&src=http%3A%2F%2Fpic23.photophoto.cn%2F20120503%2F0034034456597026_b.jpg';

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

  startTime = ()=>{
    if(this.timer!=null)return;
    this.timer = setInterval(this.startTick,1000);
  }

  // 开始倒计时
  startTick = ()=>{
    --this.totalSec ;
    if(this.totalSec<0){
      this.setState({
        timeString:'重新获取',
        activeTimer:false
      })
      clearInterval(this.timer);
      this.totalSec = TOTALSEC ;
      this.timer = null ;
    }
    else {
      this.setState({
        timeString:this.totalSec+'s',
        activeTimer:true
      })
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <List renderHeader={() => '手机号登录'}>
          <InputItem
            {...getFieldProps('phoneNum')}
            clear
            type={'phone'}
            placeholder="请输入手机号"
            ref={el => this.autoFocusInst = el}
          >手机号</InputItem>

          <div style={styles.flexR}>
            <InputItem
              {...getFieldProps('checkCode')}
              clear
              type={'number'}
              placeholder="请输入验证码"
              ref={el => this.inputRef = el}
            ></InputItem>
            <div onClick={this.startTime} style={this.state.activeTimer?styles.checkCodeBtnGray:styles.checkCodeBtn}>{this.state.timeString}</div>
          </div>


          <List.Item>
            <Button type="warning" onClick={this.handleClick}>确定</Button>
          </List.Item>
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
        <img height="200" width="100%" src={bgUrl} alt=""/>
        <WhiteSpace/>
        {this.state.showLoginForm?(<MobileLoginWrapper/>):(<Button type="warning" style={{marginRight: '16px', marginLeft: '16px'}} onClick={this.loginByMobilePhone}>输入手机号登录</Button>)}
        <WhiteSpace/>
        <div style={styles.copyRight}>北京汇格信息科技有限公司</div>
      </div>
    );
  }
}

Login.propTypes = {};

export default connect()(Login);


const styles = {
  copyRight:{
    position:'fixed',
    bottom:'20px',
    textAlign:'center',
    width:'100%',
    color:'#999999',
    fontSize:'12px'
  },

  flexR:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingRight:'15px'
  },

  checkCodeBtn:{
    color:'red',
    fontSize:'14px'
  },

  checkCodeBtnGray:{
    color:'#999999',
    fontSize:'14px'
  }
}
