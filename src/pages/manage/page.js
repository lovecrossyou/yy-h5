/**
 * Created by zhulizhe on 2018-12-08.
 */

import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import DocumentTitle from 'react-document-title';
import { Icon, Tabs, Badge ,NavBar} from 'antd-mobile';

import styles from './page.css';
import label_icon from './images/label_icon@2x.png' ;
import shangpingouwudai from './images/shangpingouwudai@2x.png';
import yunyingshang from './images/yunyingshang@2x.png';
import yuangongguanli from './images/yuangongguanli@2x.png';
import dingdan from './images/dingdan@2x.png';
import dianpu from './images/dianpu@2x.png';
import quan from './images/quan@2x.png';
import tixian from './images/tixian@2x.png';
import ScrollWrap from '../../components/scroll';


const LabelMgr = {
  img: label_icon,
  label: '分类管理',
};

const ProductMgr = {
  img: shangpingouwudai,
  label: '商品管理',
};

const SaleMgr = {
  img: yunyingshang,
  label: '营销管理',
};

const OperatorMgr = {
  img: yuangongguanli,
  label: '员工管理',
};


const OrderMgr = {
  img: dingdan,
  label: '订单管理',
};

const ShopMgr = {
  img: dianpu,
  label: '店铺管理',
};

const TicketMgr = {
  img: quan,
  label: '水票管理',
};

const WithdrawMgr = {
  img: tixian,
  label: '提现管理',
};


const MgrItem = ({ item = null, onClick }) => {
  if (item == null) {
    return <div className={styles.mgr_item_empty}>
    </div>;
  }
  return <div className={styles.mgr_item} onClick={onClick}>
    <img className={styles.mgr_item_img} src={item.img} alt=""/>
    <div className={styles.mgr_item_label}>{item.label}</div>
  </div>;
};


class Manager extends React.Component {


  constructor(props) {
    super(props);
    this.clientHeight = window.document.body.clientHeight;
  }

  render() {
    return <DocumentTitle title='管理'>
      <div style={{ height: `${this.clientHeight - 64 - 50}px`, position: 'relative' }}>
        <NavBar
          mode="dark"
          className={styles.nav}
          style={{ backgroundColor: "#FF8638",height:'64px' }}
          onLeftClick={() => {
            //这里需要做指定式跳转，手机页面会涉及到用户刷新的问题
            router.go(-1);
          }}
        >
          管理
        </NavBar>
        <ScrollWrap wrapId="rootList" wrapClass={styles.wrap_body}>
          <div className={styles.mgr_row}>
            <MgrItem
              item={LabelMgr}
              onClick={() => {
                router.push('/product/productcategory');
              }}/>
            <MgrItem
              item={ProductMgr}
              onClick={() => {
                router.push('/classify/page');
              }}/>
            <MgrItem
              item={SaleMgr}
              onClick={() => {
                router.push('/marketing/page');
              }}
            />
          </div>

          <div className={styles.mgr_row}>
            <MgrItem
              item={OperatorMgr}
              onClick={() => {
                router.push('/shop/operatormgr');
              }}/>
            <MgrItem item={OrderMgr}/>
            <MgrItem item={ShopMgr}/>
          </div>

          <div className={styles.mgr_row}>
            <MgrItem item={TicketMgr}/>
            <MgrItem item={WithdrawMgr}
                     onClick={() => {
                       router.push('/withdraw/page');
                     }}
            />
            <MgrItem/>
          </div>
        </ScrollWrap>
      </div>
    </DocumentTitle>;
  }
}

export default connect()(Manager);
