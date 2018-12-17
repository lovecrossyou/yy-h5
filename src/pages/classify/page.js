import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import {Button} from 'antd-mobile';

import styles from './page.css';
import icon_edit from './images/icon_edit.png'

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
                  <div className={styles.classify_left_price}>¥{data.price/100}</div>
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

  state = {
    needIndex: 0,
  };

  handleClick(categoryIndex) {
    //请求分类下商品
    this.setState({
      needIndex: categoryIndex,
    });
  }

  editClick = p =>{
    console.log('p ',p);
    this.props.dispatch({
      type:'product/saveFormData',
      payload:p
    })
    this.props.dispatch(routerRedux.push('/product/edit?id='+p.id))
  }

  render() {
    const { category_list, category_products } = this.props.store;
    return (
      <DocumentTitle title='商品列表'>
        <div className={styles.warpper}>
          <ul>
            <li className={styles.classify_list}>
              {category_list.map((data, index) => {
                return (
                  <span key={index + '#'} onClick={this.handleClick.bind(this, index)}
                        className={this.state.needIndex == index ? styles.onclick_after : styles.onclick_before}>{data.name}</span>
                );
              })
              }
            </li>
            <RightContent
              editClick={this.editClick}
              datas={category_products}
              index={this.state.needIndex}/>
          </ul>
          <div className={styles.footer_btn}>
            <Button type="primary" onClick={()=>{
              this.props.dispatch(routerRedux.push('/product/page'))
            }}>添加商品</Button>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(state => {
  return {
    store: state.classify,
  };
})(Classify);
