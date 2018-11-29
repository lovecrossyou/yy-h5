import React from 'react';

import {List, InputItem, WhiteSpace, Button, WingBlank, ImagePicker, Icon} from 'antd-mobile';
import {createForm} from 'rc-form';
import styles from './page.css'

const Item = List.Item;

class Settled extends React.Component {
  state = {
    files: [],
  };
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  };
  onAddImageClick = (e) => {
    e.preventDefault();
    this.setState({
      files: this.state.files.concat({
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '3',
      }),
    });
  };

  handleClick = () => {
    this.inputRef.focus();
  }

  confirmClick = () => {
    this.props.form.validateFields((error, value) => {
      console.log('error ', error)
      console.log('value ', value)
    })
  }

  render() {
    const {files} = this.state;
    const {getFieldProps} = this.props.form;
    return (
      <WingBlank>
        <List renderHeader={() => '店铺信息'}>
          <InputItem
            {...getFieldProps('shopName')}
            clear
            placeholder="店铺信息"
            ref={el => this.autoFocusInst = el}
          >店铺名称</InputItem>
          <Item extra="北京市西城区百万庄大街" arrow="horizontal" onClick={() => {
          }}>店铺地址</Item>

          <div className={styles.head_portrait} onClick={() => {
            // console.log('点击获取头像');
            // props.dispatch(routerRedux.push('/personInfo/userPicture'));
          }}>
            <span className={styles.head_portrait_title}>店铺头像</span>
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

                }}
              />
              <img className={styles.icon_name} alt=""/>
              <Icon type="right" color='#999999'/>
            </span>
          </div>

          <Item>店内环境</Item>
          <ImagePicker
            length="6"
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 7}
            onAddImageClick={this.onAddImageClick}
          />
          <WhiteSpace/>
        </List>
        <WhiteSpace/>
        <List renderHeader={() => '用户信息'}>
          <InputItem
            {...getFieldProps('userName')}
            placeholder="姓名"
          >姓名</InputItem>
          <InputItem
            {...getFieldProps('phoneNum')}
            type="phone"
            placeholder="手机号码"
          >手机号码</InputItem>
        </List>
        <WhiteSpace/>
        <List renderHeader={() => '提现信息'}>
          <InputItem
            {...getFieldProps('bankCard', {
              initialValue: '',
            })}
            type="bankCard"
            placeholder="1234 5678 0000"
          >提现银行卡</InputItem>
        </List>
        <WhiteSpace/>
        <WhiteSpace/>
        <Button type="primary" onClick={this.confirmClick}>确认</Button>

      </WingBlank>
    );
  }
}

const
  SettledWrapper = createForm()(Settled);
export default SettledWrapper
