import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import DocumentTitle from 'react-document-title';
import {Button} from 'antd-mobile';

import styles from './page.css';
import icon_edit from './images/icon_edit.png'
import {ActivityIndicator} from "../../components/ActivityIndicator";

const priceConvert = price=>{
  const price_yuan = parseFloat(price/100) ;
  return price_yuan.toFixed(2);
}

const RightContent = ({ datas, index,editClick }) => {
  if (datas.length <= index) return null;
  return (
    <div className={styles.classify_content_wrap}>
      {
        datas[index].products.map((data, index) => {
          return <div
            className={styles.classify_shop}
            key={index+'#'}
            onClick={()=>{
              editClick(data);
            }}>
            <div className={styles.classify_left_wrapper}>
              <img src={data.headImage} alt="" className={styles.classify_shop_img}/>
              <div className={styles.classify_info}>
                <div className={styles.classify_left_title}>{data.headName}</div>
                <div className={styles.classify_left_wrapper}>
                  <div className={styles.classify_left_price}>¥{priceConvert(data.price)}</div>
                  <div className={styles.classify_left_stock}>库存x1</div>
                </div>
              </div>
            </div>
            <img src={icon_edit} alt="" className={styles.classify_right_edit}/>
          </div>
        })
      }
    </div>
  );
};

class Classify extends Component {

  handleClick(categoryIndex) {
    //请求分类下商品
    this.props.dispatch({
      type:'classify/setCategoryIndex',
      payload:categoryIndex
    })
  }

  editClick = p =>{
    console.log('p ',p);
    this.props.dispatch({
      type:'product/saveFormData',
      payload:p
    })
    router.push('/product/edit?id='+p.id);
  }

  addProduct = ()=>{
    this.props.dispatch({
      type:'product/resetFormData',
      payload:{
        headName: null,
        price: null,
        originalPrice: null,
        spec: null,
        stock: null,
        detailImages: []
      }
    })
    router.push('/product/page');

  }

  render() {
    const { category_list, category_products,categoryIndex } = this.props.store;
    return (
      <DocumentTitle title='商品列表'>
        <div className='global_container'>
          <div className={styles.warpper}>
            <ul>
              <li className={styles.classify_list}>
                {category_list.map((data, index) => {
                  return (
                    <span
                      key={index + '#'}
                      onClick={this.handleClick.bind(this, index)}
                      className={categoryIndex === index ? styles.onclick_after : styles.onclick_before}>{data.name}</span>
                  );
                })
                }
              </li>
              <RightContent
                editClick={this.editClick}
                datas={category_products}
                index={categoryIndex}/>
            </ul>
            <div className={styles.footer_btn}>
              <Button type="primary" onClick={this.addProduct.bind(this)}>添加商品</Button>
            </div>

            <ActivityIndicator animating={this.props.loading}/>

          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(state => {
  return {
    store: state.classify,
    loading:state.loading.global
  };
})(Classify);
