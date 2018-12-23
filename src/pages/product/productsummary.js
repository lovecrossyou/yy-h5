/**
 * Created by zhulizhe on 2018-12-08.
 */

import {connect} from 'dva';
import {TextareaItem,Button,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import DocumentTitle from 'react-document-title';

import styles from './page.css'
import React from 'react';
import * as routerRedux from 'react-router-redux';


function ProductSummary(props) {
  return (
    <DocumentTitle title='商品描述'>
      <div className='global_container'>
        <div className={styles.summary_content}>
          <TextareaItem
            {...props.form.getFieldProps('productDescribe', {
              initialValue: '',
            })}
            placeholder="7天无理由退货，180天质保"
            rows={5}
            count={100}
          />
        </div>
        <div className={styles.footer_btn}>
          <Button
            type="primary"
            onClick={()=>{
              props.form.validateFields((error, value) => {
                console.log(error, value);
                console.log('saveSummary ',value);
                const productDescribe = value.productDescribe ;
                if(productDescribe==undefined||productDescribe===''){
                  Toast.show('请输入描述信息')
                  return;
                }

                const formData = props.store.formData ;
                const data = {
                  ...formData,
                  productDescribe:productDescribe
                }
                props.dispatch({
                  type:'product/saveFormData',
                  payload:data
                })
                props.dispatch(routerRedux.goBack());
              });
            }}>完成</Button>
        </div>
      </div>
    </DocumentTitle>
  )
}

const ProductSummaryWrapper = createForm()(ProductSummary);

export default connect(state=>{
  return {
    store:state.product
  }
})(ProductSummaryWrapper)
