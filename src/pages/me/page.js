/**
 * Created by zhulizhe on 2018-12-08.
 */
import {connect} from 'dva';
import {Icon, List} from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import router from 'umi/router';

import styles from './page.less';

import record_img from './images/jiaoyijilu@2x.png'
import setting_img from './images/settings@2x.png'

const Item = List.Item

const ShopHeader = ({shopInfo}) => {
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


function Me(props) {

  console.log('global ', props.global);
  return <DocumentTitle title='我'>
    <div>
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
            router.push('/me/setting')
          }}
        >设置</Item>
      </List>
    </div>
  </DocumentTitle>;
}

export default connect(state => {
  return {
    global: state.global,
    shop:state.shop
  }
})(Me);
