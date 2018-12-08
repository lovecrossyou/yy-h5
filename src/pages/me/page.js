/**
 * Created by zhulizhe on 2018-12-08.
 */
import { connect } from 'dva';
import { Icon ,List} from 'antd-mobile';
import DocumentTitle from 'react-document-title';

import styles from './page.less';

import record_img  from './images/jiaoyijilu@2x.png'
import setting_img from './images/settings@2x.png'

const Item = List.Item

const ShopHeader = () => {
  return <div className={styles.shop_header}>
    <div className={styles.flex_row}>
      <img alt="" className={styles.avatar}/>

      <div className={styles.shop_info}>
        <div className={styles.shop_name}>小贝水站</div>
      </div>
    </div>
    <div className={styles.shop_arrow}>
      <Icon type='right' color='rgba(255,134,56,1)'/>
    </div>
  </div>;
};


function Me(props) {
  return <DocumentTitle title='我'>
    <div>
      <ShopHeader/>
      <List className={styles.items}>
        <Item
          thumb={record_img}
          arrow="horizontal"
          onClick={() => {}}
        >交易记录</Item>
        <Item
          thumb={setting_img}
          arrow="horizontal"
          onClick={() => {}}
        >设置</Item>
      </List>
    </div>
  </DocumentTitle>;
}

export default connect()(Me);
