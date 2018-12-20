import React from 'react';
import router from 'umi/router';
import {connect} from 'dva';
import DocumentTitle from 'react-document-title';

import {List, InputItem, WhiteSpace, Button, TextareaItem, Radio, Icon,Toast,Picker} from 'antd-mobile';
import {createForm} from 'rc-form';
import styles from './page.css'
import {shopTypeData} from "../../utils/config";

const Item = List.Item;


class ShopDetail extends React.Component {

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
  };


  confirmClick = () => {
    let {shopParamInfo,productImageUrls} = this.props.store ;

    const {name,shopType,imageUrl,presentation,locationInfo,telephone,adminName,adminMobilePhone} = shopParamInfo ;

    console.log('shopParamInfo ',shopParamInfo);

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

    if(Object.keys(locationInfo).length===0){
      Toast.show('请输入店铺地址');
      return;
    }

    if(productImageUrls.length === 0){
      Toast.show('请上传店铺环境');
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
    let shopParams = Object.assign({},shopParamInfo) ;
    shopParams.adminMobilePhone = shopParams.adminMobilePhone.replace(/\s+/g,"");
    shopParams.telephone = shopParams.telephone.replace(/\s+/g,"");
    shopParams.shopType = shopParams.shopType[0] ;
    shopParams.shopDetailImage = productImageUrls ;
    console.log('shopParams ',shopParams);

    this.props.dispatch({
      type: 'shop/update',
      payload: shopParams,
      cb: () => {
        Toast.show('店铺已更新')
      }
    })
  }

  componentDidMount() {
    let {shopParamInfo} = this.props.store ;
    console.log('shopParamInfo ',shopParamInfo);
    this.props.form.setFieldsValue({
      name:shopParamInfo.name,
      imageUrl:shopParamInfo.imageUrl,
      telephone:shopParamInfo.telephone,
      adminName:shopParamInfo.adminName,
      adminMobilePhone:shopParamInfo.adminMobilePhone,
      presentation:shopParamInfo.presentation,
    })
  }

  setParam = p => {
    let shopParamInfo = this.props.store.shopParamInfo ;
    console.log('shopParamInfo ',shopParamInfo)

    let paramInfo = {
      ...shopParamInfo,
      ...p
    }
    console.log('paramInfo ',paramInfo)
    this.props.dispatch({
      type:'shop/saveShopParamInfo',
      payload:paramInfo
    })
  }

  // 设置店铺类型
  onChangeShopType = v=>{
    this.setParam({
      shopType:v
    })
    console.log('onChangeShopType ',v);
  }

  render() {
    const {getFieldProps} = this.props.form;
    const {productImageUrls,shopParamInfo} = this.props.store;
    return (
      <DocumentTitle title='入驻'>
        <div className='global_container'>

        <div>
          <List>
            <Picker
              data={shopTypeData}
              cols={1}
              value={shopParamInfo.shopType}
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
                      this.setParam({
                        imageUrl:imgUrl
                      })
                    },
                    progressPercent:data=>{
                      Toast.show(data);
                    }
                  });
                }}
              />
              <img src={shopParamInfo.imageUrl} className={styles.icon_name} alt=""/>
              <Icon type="right" color='#999999'/>
            </span>
            </div>
            <WhiteSpace/>

            <Item
              extra={shopParamInfo.locationInfo.addressName}
              arrow="horizontal"
              onClick={() => {
                router.push('/settled/map');
              }}
            >店铺地址</Item>

            <Item
              extra={productImageUrls.length===0?'去上传':'已上传'}
              arrow="horizontal"
              onClick={() => {
                router.push('/shop/imagepicker');
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
            <div className={styles.btn_confirm}>
              <Button type="primary" onClick={this.confirmClick}>更新</Button>
            </div>
          </div>
        </div>
        </div>
      </DocumentTitle>

    );
  }
}

const ShopDetailWrapper = createForm()(ShopDetail);

export default connect(state=>{
  return {
    store:state.shop
  }
})(ShopDetailWrapper)
