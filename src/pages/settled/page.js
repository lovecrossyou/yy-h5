import React from 'react';
import router from 'umi/router';
import {connect} from 'dva';
import DocumentTitle from 'react-document-title';

import {List, InputItem, WhiteSpace, Button, TextareaItem, Radio, Icon,Toast,Picker} from 'antd-mobile';
import {createForm} from 'rc-form';
import styles from './page.css'

const Item = List.Item;

const shopTypeData = [{
  label: '水站',
  value: 'water_store'
}, {
  label: '便利店',
  value: 'convenience_store'
}]

class Settled extends React.Component {

  constructor(props) {
    super(props);
    this.shopParamInfo = {};
  }

  state = {
    file: null,
    shopType:null,
    logo:null
  };
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      file: files[0],
    });
  };
  handleClick = () => {
    this.inputRef.focus();
  }

  confirmClick = () => {
    const {name,shopType,imageUrl,presentation,shopDetailImage,locationInfo,telephone,adminName,adminMobilePhone} = this.shopParamInfo ;

    console.log('shopParamInfo ',this.shopParamInfo);
    if(shopType === undefined){
      Toast.show('请选择店铺类型');
      return;
    }

    if(name === undefined){
      Toast.show('请输入店铺名称');
      return;
    }

    if(imageUrl === undefined){
      Toast.show('请上传店铺logo');
      return;
    }


    if(locationInfo === undefined){
      Toast.show('请输入店铺地址');
      return;
    }

    if(adminName === undefined){
      Toast.show('请输入店长名字');
      return;
    }


    if(telephone === undefined){
      Toast.show('请输入客服电话');
      return;
    }


    if(adminMobilePhone === undefined){
      Toast.show('请输入店长手机号');
      return;
    }


    if(presentation === undefined){
      Toast.show('请输入店铺介绍');
      return;
    }

    this.props.form.validateFields((error, value) => {
      console.log('error ', error)
      console.log('value ', value)

      return;
      this.props.dispatch({
        type: 'settled/createShop',
        payload: {
          "name": "第一个店铺",
          "shopType": "convenience_store",
          "imageUrl": "http://img3.duitang.com/uploads/item/201511/14/20151114125146_LXHzE.jpeg",
          "presentation": "店铺介绍",
          "shopDetailImage": ["11111", "22222"],
          "locationInfo": {
            "longitude": 34.991231,
            "latitude": 113.091231,
            "addressName": "小测试地址名称"
          },
          "telephone": "18610824157",
          "adminName": "我是店长",
          "adminMobilePhone": "18610824157"
        },
        cb: () => {
          this.props.dispatch(routerRedux.push('/settled/applyresult'));
        }
      })
    })
  }

  setParam = p => {
    this.shopParamInfo = {
      ...this.shopParamInfo,
      ...p
    }
  }

  // 设置店铺类型
  onChangeShopType = v=>{
    this.setParam({
      shopType:v[0]
    })
    console.log('onChangeShopType ',v);

    this.setState({
      shopType:v
    })
  }

  render() {
    const {getFieldProps} = this.props.form;

    const {productImageUrls} = this.props.store;
    return (
      <DocumentTitle title='入驻'>
        <div>
          <List>
            <Picker
              data={shopTypeData}
              cols={1}
              value={this.state.shopType}
              onOk={this.onChangeShopType}
            >
              <List.Item arrow="horizontal">店铺类型</List.Item>
            </Picker>

            <InputItem
              {...getFieldProps('name', {
                onChange: v => {
                  this.setParam({
                    name: v
                  })
                }
              })}
              clear
              placeholder="店铺信息"
              ref={el => this.autoFocusInst = el}
            >店铺名称</InputItem>
            <div className={styles.head_portrait} onClick={() => {
              // console.log('点击获取头像');
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

                  this.props.dispatch({
                    type: 'global/upload',
                    payload: files[0],
                    cb: (imgUrl) => {
                      console.log('imgUrl ',imgUrl)
                      this.shopParamInfo.imageUrl = imgUrl;
                      this.setState({
                        logo:imgUrl
                      })
                    },
                  });
                }}
              />
              <img src={this.state.logo} className={styles.icon_name} alt=""/>
              <Icon type="right" color='#999999'/>
            </span>
            </div>
            <WhiteSpace/>

            <Item
              extra="请选择地区"
              arrow="horizontal"
              onClick={() => {
                router.push('/settled/map');
              }}
            >店铺地址</Item>

            <Item
              extra={productImageUrls.length===0?'去上传':'已上传'}
              arrow="horizontal"
              onClick={() => {
                router.push('/settled/imagepicker');
              }}
            >店内环境</Item>
            <WhiteSpace/>

            <InputItem
              {...getFieldProps('adminName', {
                onChange: v => {
                  this.setParam({
                    adminName: v
                  })
                }
              })}
              placeholder="姓名"
            >店长</InputItem>
            <InputItem
              {...getFieldProps('telephone', {
                onChange: v => {
                  this.setParam({
                    telephone: v
                  })
                }
              })}
              type="phone"
              placeholder="客服电话"
            >客服电话</InputItem>
            <InputItem
              {...getFieldProps('adminMobilePhone', {
                onChange: v => {
                  this.setParam({
                    adminMobilePhone: v
                  })
                }
              })}
              type="phone"
              placeholder="手机号码"
            >手机号</InputItem>

            <TextareaItem
              {...getFieldProps('presentation', {
                onChange: v => {
                  this.setParam({
                    presentation: v
                  })
                }
              })}
              title="店铺介绍"
              autoHeight
              placeholder='产品质优价廉，请各位放心！'
              labelNumber={5}
            />

          </List>
          <WhiteSpace/>
          <List>

          </List>
          <WhiteSpace/>

          <div className={styles.footer_wrapper}>
            <div className={styles.protocol_wrapper}>
              <div className={styles.protocol}>
                <Radio className={styles.footer_text_pre} onChange={e => console.log('checkbox', e)}>我已阅读并同意</Radio>
              </div>
              <div className={styles.footer_text_dec}>《翼优开店说明》</div>
            </div>
            <div className={styles.btn_confirm}>
              <Button type="primary" onClick={this.confirmClick}>我准备好了</Button>
            </div>
          </div>
        </div>
      </DocumentTitle>

    );
  }
}

const SettledWrapper = createForm()(Settled);

export default connect()(SettledWrapper)
