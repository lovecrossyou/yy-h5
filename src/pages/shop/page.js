import React from 'react';
import { routerRedux } from 'dva/router';
import {connect} from 'dva';
import DocumentTitle from 'react-document-title';

import {List, InputItem, WhiteSpace, Button, TextareaItem, Radio, Icon,Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import styles from './page.css'

const RadioItem = Radio.RadioItem;
const Item = List.Item;

class ShopDetail extends React.Component {
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

      this.props.dispatch({
        type:'settled/createShop',
        payload:{
          "name":"第一个店铺",
          "shopType":"convenience_store",
          "imageUrl":"http://img3.duitang.com/uploads/item/201511/14/20151114125146_LXHzE.jpeg",
          "presentation":"店铺介绍",
          "shopDetailImage":["11111","22222"],
          "locationInfo":{
            "longitude":34.991231,
            "latitude":113.091231,
            "addressName":"小测试地址名称"
          },
          "telephone":"18610824157",
          "adminName":"我是店长",
          "adminMobilePhone":"18610824157"
        }
      })


      return;
      this.props.dispatch(routerRedux.push('/settled/applyresult'));
    })
  }

  render() {
    const {shopInfo} = this.props.store ;
    console.log('shopInfo ',shopInfo) ;
    if(shopInfo==null){
      return null;
    }
    const {commissionRatio,createTime,imageUrl,name,presentation,score,shopSn,shopDetailImage,shopStatus,shopStatusVal,shopType} = shopInfo ;

    // commissionRatio: 5
    // createTime: "2018-12-15 19:38:30"
    // id: 13
    // imageUrl: "http://img3.duitang.com/uploads/item/201511/14/20151114125146_LXHzE.jpeg"
    // name: "第一个店铺"
    // presentation: "店铺介绍"
    // score: 10
    // shopDetailImage: (2) ["11111", "22222"]
    // shopSn: "SP181215297"
    // shopStatus: "待审核"
    // shopStatusVal: "waiting_permission"
    // shopType: "便利店"
    const {files} = this.state;
    const {getFieldProps} = this.props.form;
    return (
      <DocumentTitle title='入驻'>
        <div className='global_container'>
          <List>
            <InputItem
              {...getFieldProps('name')}
              clear
              defaultValue={name}
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
                      this.props.dispatch({
                        type: 'settled/saveImageUrl',
                        payload:imgUrl
                      });
                    },
                    progressPercent:data=>{
                      Toast.show(data);
                    }
                  });

                }}
              />
              <img src={imageUrl} className={styles.icon_name} alt=""/>
              <Icon type="right" color='#999999'/>
            </span>
            </div>
            <WhiteSpace/>

            <Item
              extra="请选择地区"
              arrow="horizontal"
              onClick={() => {
                this.props.dispatch(routerRedux.push('/settled/map'));
              }}
            >店铺地址</Item>

            <Item
              extra="去上传"
              arrow="horizontal"
              onClick={() => {
                this.props.dispatch(routerRedux.push('/settled/imagepicker'));
              }}
            >店内环境</Item>
            <WhiteSpace/>

            <InputItem
              {...getFieldProps('adminName')}
              placeholder="姓名"
            >店长</InputItem>
            <InputItem
              {...getFieldProps('telephone')}
              type="phone"
              placeholder="客服电话"
            >客服电话</InputItem>
            <InputItem
              {...getFieldProps('adminMobilePhone')}
              type="phone"
              placeholder="手机号码"
            >手机号</InputItem>

            <TextareaItem
              {...getFieldProps('presentation')}
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
            <div className={styles.btn_confirm} >
              <Button type="primary" onClick={this.confirmClick}>完成</Button>
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
