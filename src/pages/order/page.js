/**
 * Created by zhulizhe on 2018-12-12.
 */
import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, Flex } from 'antd-mobile';
import styles from './page.css';
import DocumentTitle from 'react-document-title';

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);


const AddressContainer = () => {
  return <div className={styles.addr_wrapper}>
    <div className={styles.product_info_desc}>北京市朝阳区望京soho566室</div>
    <div className={styles.product_info_desc}>任蕊芳 18356231456</div>
  </div>;
};

const ProductContainer = () => {
  return <div className={styles.products_wrapper}>
    <div className={styles.flex_row_center}>
      <div className={styles.p_img}></div>
      <div className={styles.p_info_wrapper}>
        <div>紫砂壶</div>
        <div>¥25.00 <div style={{ display: 'inline-block', color: '#cc2636' }}>x 4</div></div>
      </div>
    </div>
    <div className={styles.flex_row_bot}>
      <div style={{ color: '#cc2636' }}>
        ¥100.00
      </div>
    </div>


  </div>;
};

const ProductInfoContainer = () => {
  return <div className={styles.product_info_wrapper}>
    <div className={styles.flex_row_center}>
      <div className={styles.product_info_title}>订单编号</div>
      <div className={styles.product_info_desc}>75112203108246</div>
    </div>

    <div className={styles.flex_row_center}>
      <div className={styles.product_info_title}>下单时间</div>
      <div className={styles.product_info_desc}>2018.10.12 12:00</div>
    </div>

    <div className={styles.flex_row_center}>
      <div className={styles.product_info_title}>优惠券</div>
      <div className={styles.product_info_desc}>无</div>
    </div>

    <div className={styles.flex_row_center}>
      <div className={styles.product_info_title}>实付款</div>
      <div className={styles.product_info_desc_red}>¥200.00</div>
    </div>
  </div>;
};


function OrderDetail() {
  return <DocumentTitle title='订单详情'>
    <div className={styles.container}>
      <WhiteSpace/>
      <WingBlank>
        <AddressContainer/>
      </WingBlank>

      <WhiteSpace/>

      <WingBlank>
        <ProductContainer/>
        <ProductContainer/>
        <ProductContainer/>
      </WingBlank>
      <WhiteSpace/>

      <WingBlank>
        <ProductInfoContainer/>
      </WingBlank>
    </div>
  </DocumentTitle>;
}

export default connect()(OrderDetail);
