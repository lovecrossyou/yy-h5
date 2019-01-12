/**
 * Created by zhulizhe on 2018-12-08.
 */
import { connect } from 'dva';
import { Icon, List, NavBar } from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import router from 'umi/router';

import styles from './page.less';

import record_img from './images/jiaoyijilu@2x.png';
import setting_img from './images/settings@2x.png';
import React from 'react';
import ScrollWrap from '../../components/scroll';

const Item = List.Item;

const ShopHeader = ({ shopInfo }) => {
  return <div className='global_container'>
    <div className={styles.shop_header}>
      <div className={styles.flex_row}>
        <img src={shopInfo.imageUrl} alt="" className={styles.avatar}/>

        <div className={styles.shop_info}>
          <div className={styles.shop_name}>{shopInfo.name}</div>
        </div>
      </div>
      <div className={styles.shop_arrow}>
        <Icon type='right' color='rgba(255,134,56,1)'/>
      </div>
    </div>
  </div>;
};


class Me extends React.Component {

  constructor(props) {
    super(props);
    this.clientHeight = window.document.body.clientHeight;
  }

  render() {
    const props = this.props;
    return <DocumentTitle title='我'>
      <div style={{ height: `${this.clientHeight - 64 - 50}px`, position: 'relative' }}>
        <NavBar
          mode="dark"
          className={styles.nav}
          style={{ backgroundColor: '#FF8638', height: '64px' }}
          onLeftClick={() => {
            //这里需要做指定式跳转，手机页面会涉及到用户刷新的问题
            router.go(-1);
          }}
        >
          我
        </NavBar>
        <ScrollWrap wrapId="shopList" wrapClass={styles.wrap_body}>
          <ShopHeader shopInfo={props.shop.shopParamInfo}/>
          <List className={styles.items}>
            <Item
              thumb={record_img}
              arrow="horizontal"
              onClick={() => {
              }}
            >交易记录</Item>
            <Item
              thumb={setting_img}
              arrow="horizontal"
              onClick={() => {
                router.push('/me/setting');
              }}
            >设置</Item>


          </List>
        </ScrollWrap>
      </div>
    </DocumentTitle>;
  }
}

export default connect(state => {
  return {
    global: state.global,
    shop: state.shop,
  };
})(Me);
