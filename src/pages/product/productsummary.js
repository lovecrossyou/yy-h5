/**
 * Created by zhulizhe on 2018-12-08.
 */

import {connect} from 'dva';
import {TextareaItem,Button} from 'antd-mobile';
import { createForm } from 'rc-form';
import DocumentTitle from 'react-document-title';

import styles from './page.css'
import React from 'react';

const confirmClick = ()=>{

}

function ProductSummary(props) {
  return (
    <DocumentTitle title='商品描述'>
      <div>
        <div className={styles.summary_content}>
          <TextareaItem
            {...props.form.getFieldProps('count', {
              initialValue: '',
            })}
            placeholder="7天无理由退货，180天质保"
            rows={5}
            count={100}
          />
        </div>
        <div className={styles.footer_btn}>
          <Button type="primary" onClick={confirmClick}>完成</Button>
        </div>
      </div>
    </DocumentTitle>
  )
}

const ProductSummaryWrapper = createForm()(ProductSummary);

export default connect()(ProductSummaryWrapper)
