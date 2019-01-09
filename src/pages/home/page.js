import React from 'react';

import {connect} from "dva";
import {Icon, Tabs,Badge} from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import { routerRedux } from 'dva/router';
import router from 'umi/router';

import styles from './page.less'
import {DeliveryOrderItem} from "./components/DeliveryOrderItem";




const tabs = [
  { title: <Badge text={'3'}>全部</Badge> },
  { title: <Badge text={'今日(20)'}>待送货</Badge> },
  { title: <Badge dot>已完成</Badge> },
];


const ShopHeader = ({onClick,shopInfo}) => {
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
  </div>
}




const DeliveryList = ({onClick}) => {
  const contentHeight = document.documentElement.clientHeight - 100  ;
  return <div className={styles.delivery_list}>
    <Tabs tabs={tabs}
          initialPage={0}
          swipeable={false}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
    >
      <div className={styles.delivery_wrapper}  style={{flexDirection:'column'}}>
        <DeliveryOrderItem onClick={onClick}/>

      </div>
      <div className={styles.delivery_wrapper} style={{height:contentHeight}}>
        Content of second tab
      </div>
      <div className={styles.delivery_wrapper} style={{height:contentHeight}}>
        Content of third tab
      </div>
    </Tabs>
  </div>
}


function Home(props) {
  const {shopParamInfo} = props.store ;
  return <DocumentTitle title='首页'>
    <div className='global_container'>
      <ShopHeader
        shopInfo={shopParamInfo}
        onClick={()=>{
          router.push('/shop/page');
          // props.dispatch(routerRedux.push('/shop/page'))
        }}
      />
      <DeliveryList
        onClick={order=>{
          props.dispatch(routerRedux.push('/order/page'))
        }}/>
    </div>
  </DocumentTitle>
}

export default connect(state=>{
  return {
    store:state.shop
  }
})(Home)
