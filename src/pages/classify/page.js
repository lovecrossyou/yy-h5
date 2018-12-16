import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';

import styles from './page.css';
import icon_edit from './images/icon_edit.png'

const RightContent = ({ datas, index }) => {
  if (datas.length <= index) return null;
  return (
    <div className={styles.classify_content_wrap}>
      {
        datas[index].products.map((data, index) => {
          return <div className={styles.classify_shop} key={index+'#'}>
            <div className={styles.classify_left_wrapper}>
              <img src={data.headImage} alt="" className={styles.classify_shop_img}/>
              <div className={styles.classify_info}>
                <div className={styles.classify_left_title}>{data.headName}</div>
                <div className={styles.classify_left_wrapper}>
                  <div className={styles.classify_left_price}>¥{data.price}</div>
                  <div className={styles.classify_left_volume}>库存x1</div>
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
              datas={category_products}
              index={this.state.needIndex}/>
          </ul>
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
