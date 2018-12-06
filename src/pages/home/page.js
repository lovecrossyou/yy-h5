import {connect} from "dva";
import {Icon, Tabs,Badge} from 'antd-mobile';

import styles from './page.css'

const tabs = [
  { title: <Badge text={'3'}>全部</Badge> },
  { title: <Badge text={'今日(20)'}>待送货</Badge> },
  { title: <Badge dot>已完成</Badge> },
];


const ShopHeader = () => {
  return <div className={styles.shop_header}>
    <div className={styles.flex_row}>
      <img alt="" className={styles.avatar}/>

      <div className={styles.shop_info}>
        <div className={styles.shop_name}>小贝水站</div>
        <div className={styles.shop_sale}>销量：500+</div>
      </div>
    </div>
    <div className={styles.shop_arrow}>
      <Icon type='right' color='rgba(255,134,56,1)'/>
    </div>
  </div>
}


const DeliveryList = () => {
  const contentHeight = document.documentElement.clientHeight - 100  ;
  return <div className={styles.delivery_list}>
    <Tabs tabs={tabs}
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',height:contentHeight, backgroundColor: '#fff' }}>
        Content of first tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: contentHeight, backgroundColor: '#fff' }}>
        Content of second tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: contentHeight, backgroundColor: '#fff' }}>
        Content of third tab
      </div>
    </Tabs>
  </div>
}

function Home(props) {
  return <div>
    <ShopHeader/>
    <DeliveryList/>
  </div>
}

export default connect()(Home)
