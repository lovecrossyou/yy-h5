import React, { Component } from 'react';

import { connect } from 'dva';
import { Icon, Tabs, Badge ,NavBar} from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import { routerRedux } from 'dva/router';
import router from 'umi/router';

import styles from './page.less';
import { DeliveryOrderItem } from './components/DeliveryOrderItem';
import ScrollWrap from '../../components/scroll';


const tabs = [
  { title: <Badge text={'3'}>全部</Badge> },
  { title: <Badge text={'今日(20)'}>待送货</Badge> },
  { title: <Badge dot>已完成</Badge> },
];


const ShopHeader = ({ onClick, shopInfo }) => {
  return <div
    className={styles.shop_header}
    onClick={onClick}>
    <div className={styles.flex_row}>
      <img src={shopInfo.imageUrl} alt="" className={styles.avatar}/>

      <div className={styles.shop_info}>
        <div className={styles.shop_name}>{shopInfo.name}</div>
        <div className={styles.shop_sale}>销量：500+</div>
      </div>
    </div>
    <div className={styles.shop_arrow}>
      <Icon type='right' color='rgba(255,134,56,1)'/>
    </div>
  </div>;
};


const DeliveryList = ({ onClick }) => {
  const contentHeight = document.documentElement.clientHeight - 100;
  return <div className={styles.delivery_list}>
    <Tabs tabs={tabs}
          initialPage={0}
          swipeable={false}
          onChange={(tab, index) => {
            console.log('onChange', index, tab);
          }}
          onTabClick={(tab, index) => {
            console.log('onTabClick', index, tab);
          }}
    >
      <div className={styles.delivery_wrapper} style={{ flexDirection: 'column' }}>
        <DeliveryOrderItem onClick={onClick}/>
        <DeliveryOrderItem onClick={onClick}/>
        <DeliveryOrderItem onClick={onClick}/>
        <DeliveryOrderItem onClick={onClick}/>

      </div>
      <div className={styles.delivery_wrapper} style={{ height: contentHeight }}>
        Content of second tab
      </div>
      <div className={styles.delivery_wrapper} style={{ height: contentHeight }}>
        Content of third tab
      </div>
    </Tabs>
  </div>;
};


class Home extends Component{
  constructor(props) {
    super(props);
    this.clientHeight = window.document.body.clientHeight;
  }

  render() {
    const props = this.props ;
    const { shopParamInfo } = props.store;
    return <DocumentTitle title='首页'>
      <div style={{ height: `${this.clientHeight - 64 - 50}px`, position: "relative" }}>
        <NavBar
          mode="dark"
          className={styles.nav}
          style={{ backgroundColor: "#FF8638",height:'64px' }}
          onLeftClick={() => {
            //这里需要做指定式跳转，手机页面会涉及到用户刷新的问题
            router.go(-1);
          }}
        >
          首页
        </NavBar>
        <ScrollWrap wrapId="rootList" wrapClass={styles.wrap_body}>
          <ShopHeader
            shopInfo={shopParamInfo}
            onClick={() => {
              router.push('/shop/page');
              // props.dispatch(routerRedux.push('/shop/page'))
            }}
          />
          <DeliveryList
            onClick={order => {
              props.dispatch(routerRedux.push('/order/page'));
            }}/>
        </ScrollWrap>
      </div>
    </DocumentTitle>;
  }
}

export default connect(state => {
  return {
    store: state.shop,
  };
})(Home);
