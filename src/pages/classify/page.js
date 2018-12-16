import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';

import styles from './page.css'

class Classify extends Component {

  state = {
    needIndex:0
  }


  handleClick(categoryIndex){
    //请求分类下商品
    const {category_list} = this.props.store ;
    const selectCategory = category_list[categoryIndex];
    console.log('categoryIndex ',selectCategory);
    this.props.dispatch({
      type:'classify/productOfCategory',
      payload:{
        id:selectCategory.id
      }
    })
    this.setState({
      needIndex:categoryIndex
    })
  }

  render() {
    const {category_list,products} = this.props.store ;
    return (
      <DocumentTitle title='分类'>
        <div className={styles.warpper}>
          <ul>
            <li className={styles.classify_list}>
              {category_list.map((data,index) => {
                return (
                  <span key={index+'#'} onClick={this.handleClick.bind(this,index)} className={this.state.needIndex==index?styles.onclick_after:styles.onclick_before}>{data.name}</span>
                )
              })
              }
            </li>
            <li className={styles.classify_content_wrap}>
              {products.map((data,index) =>{
                return (
                  <div
                    onClick={()=>{
                      const {id} = data ;
                      console.log('data ',data);
                      this.props.dispatch(routerRedux.push('./classify_detail?categoryId='+id))
                    }}
                    key={index}
                    className={styles.classify_shop}>
                    <div className={styles.classify_shop_img}>
                      <img src={data.url} alt=""/>
                    </div>
                    <p className={styles.classify_shop_name}>{data.name}</p>
                  </div>
                )
              })
              }
            </li>
          </ul>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(state=>{
  return {
    store:state.classify
  }
})(Classify)
