/**
 * Created by zhulizhe on 2018-12-08.
 */
/**
 * Created by zhulizhe on 2018-12-08.
 */

import {connect} from 'dva';
import DocumentTitle from 'react-document-title';
import {Button} from 'antd-mobile';
import { routerRedux } from 'dva/router';

import styles from './page.css'
import React from 'react';

const confirmClick = ()=>{

}

const CategoryItem = ({label})=>{
  return <div className={styles.category_item}>
    {label}
  </div>
}


function ProductCategory(props) {
  return (
    <DocumentTitle title='商品分类'>
      <div>
       <div>
         <CategoryItem label='生活用品'/>
         <CategoryItem label='酒水'/>
         <CategoryItem label='水果'/>
       </div>
        <div className={styles.footer_btn}>
          <Button type="primary" onClick={()=>{
            props.dispatch(routerRedux.push('/product/categoryadd'))
          }}>添加</Button>
        </div>
      </div>
    </DocumentTitle>
  )
}


export default connect()(ProductCategory)
