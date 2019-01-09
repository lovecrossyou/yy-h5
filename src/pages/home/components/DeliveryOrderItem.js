import {Icon} from 'antd-mobile';

import styles from './page.css'
import React from 'react';

import test_img1 from './images/001.jpeg'
import test_img2 from './images/002.jpeg'
import test_img3 from './images/003.jpeg'


export const DeliveryOrderItem = ({onClick})=>{
  return <div className={styles.item} onClick={onClick}>
    <div className={styles.item_addr}>北京市朝阳区安贞门神新家园562号楼4单元230</div>
    <div className={styles.item_contact}>任艳彤 18356248596</div>

    <div className={styles.item_footer}>
      <div className={styles.item_product_list}>
        <div className={styles.item_product}>
          <img src={test_img1} alt='' className={styles.item_img}></img>
          <div className={styles.item_des}>
            <div className={styles.item_text_title}>满天星</div>
            <div className={styles.item_text_count}>x 4</div>
          </div>
        </div>
        <div className={styles.item_product}>
          <img src={test_img2} alt=''className={styles.item_img}></img>
          <div className={styles.item_des}>
            <div className={styles.item_text_title}>身体乳</div>
            <div className={styles.item_text_count}>x 99</div>
          </div>
        </div>
        <div className={styles.item_product}>
          <img src={test_img3} alt=''className={styles.item_img}></img>
          <div className={styles.item_des}>
            <div className={styles.item_text_title}>紫砂壶</div>
            <div className={styles.item_text_count}>x 20</div>
          </div>
        </div>
      </div>
      <div>
        <Icon type='right' color='rgba(255,134,56,1)'/>
      </div>
    </div>
  </div>
}
