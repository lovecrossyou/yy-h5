/**
 * Created by zhulizhe on 2018-12-08.
 */

import React from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import DocumentTitle from 'react-document-title';
import styles from './page.css';


const MgrItem = ({item = null, onClick}) => {
  return <div className={styles.item} onClick={onClick}>
    <div className={styles.item_icon}>
      {item.icon}
    </div>
    <div className={styles.item_title}>
      {item.title}
    </div>
  </div>
}

const Man = {
  title:'满减',
  icon:'满'
}

const Shou= {
  title:'首单优惠',
  icon:'首'
}

const Fan = {
  title:'返券',
  icon:'返'
}

function Marketing(props) {
  return <DocumentTitle title='营销管理'>
    <div className='global_container'>
      <div className={styles.mgr_row}>
        <MgrItem
          item={Man}
          onClick={() => {
            router.push('/marketing/addmanjian')
          }}/>
        <MgrItem
          item={Shou}
          onClick={() => {
            router.push('/marketing/addshoudan')
          }}/>
        <MgrItem
          onClick={() => {
            router.push('/marketing/addfanquan')
          }}
          item={Fan}/>
      </div>
    </div>
  </DocumentTitle>
}


export default connect()(Marketing)
