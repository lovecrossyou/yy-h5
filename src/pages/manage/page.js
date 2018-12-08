/**
 * Created by zhulizhe on 2018-12-08.
 */

import React from 'react';
import { connect } from 'dva';
import { List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';

import styles from './page.css';


import label_icon from './images/label_icon@2x.png' ;
import shangpingouwudai from './images/shangpingouwudai@2x.png'
import yunyingshang from './images/yunyingshang@2x.png'
import yuangongguanli from './images/yuangongguanli@2x.png'
import dingdan from './images/dingdan@2x.png'
import dianpu from './images/dianpu@2x.png'
import quan from './images/quan@2x.png'
import tixian from './images/tixian@2x.png'


const LabelMgr ={
  img:label_icon,
  label:'分类管理'
}

const ProductMgr ={
  img:shangpingouwudai,
  label:'商品管理'
}

const SaleMgr ={
  img:yunyingshang,
  label:'营销管理'
}

const OperatorMgr ={
  img:yuangongguanli,
  label:'员工管理'
}


const OrderMgr ={
  img:dingdan,
  label:'订单管理'
}

const ShopMgr ={
  img:dianpu,
  label:'店铺管理'
}

const TicketMgr ={
  img:quan,
  label:'水票管理'
}

const WithdrawMgr ={
  img:tixian,
  label:'提现管理'
}


const MgrItem = ({item=null})=>{
  if(item==null){
    return <div className={styles.mgr_item_empty}>
    </div>
  }
  return <div className={styles.mgr_item}>
    <img className={styles.mgr_item_img} src={item.img} alt=""/>
    <div className={styles.mgr_item_label}>{item.label}</div>
  </div>
}


function Manager(props) {
  return <DocumentTitle title='管理'>
    <div className={styles.mgr_container}>
      <div className={styles.mgr_row}>
        <MgrItem item={LabelMgr}/>
        <MgrItem item={ProductMgr}/>
        <MgrItem item={SaleMgr}/>
      </div>

      <div className={styles.mgr_row}>
        <MgrItem item={OperatorMgr}/>
        <MgrItem item={OrderMgr}/>
        <MgrItem item={ShopMgr}/>
      </div>

      <div className={styles.mgr_row}>
        <MgrItem item={TicketMgr}/>
        <MgrItem item={WithdrawMgr}/>
        <MgrItem />
      </div>
    </div>
  </DocumentTitle>
}


export default connect()(Manager)
