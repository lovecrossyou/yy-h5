/**
 * Created by zhulizhe on 2018-12-08.
 */
/**
 * Created by zhulizhe on 2018-12-08.
 */

import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import { Button } from 'antd-mobile';
import { routerRedux } from 'dva/router';

import styles from './page.css';
import React from 'react';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import ScrollWrap from '../../components/scroll';


const CategoryItem = ({ label, onClick }) => {
  return <div className={styles.category_item} onClick={onClick}>
    {label}
  </div>;
};


class ProductCategory extends React.Component {

  constructor(props) {
    super(props);
    this.clientHeight = window.document.body.clientHeight;
  }

  render() {
    const props = this.props;
    const { category_list } = props.store;
    console.log('category_list ', category_list);
    return (
      <DocumentTitle title='商品分类'>
        <div className='global_container'>
          <div style={{
            height: `${this.clientHeight - 64 - 57}px`,
            position: 'relative',
          }}>
            <ScrollWrap wrapId="rootList" wrapClass={styles.wrap_body}>
              {
                category_list.map((c, index) => {
                  return (
                    <CategoryItem
                      onClick={() => {
                        props.dispatch({
                          type: 'product/saveActiveCategory',
                          payload: c,
                        });
                        props.dispatch(routerRedux.goBack());
                      }}
                      label={c.name}
                      key={index + '#'}/>
                  );
                })
              }
            </ScrollWrap>
          </div>
          <div className={styles.footer_btn}>
            <Button type="primary" onClick={() => {
              props.dispatch(routerRedux.push('/product/categoryadd'));
            }}>添加</Button>
          </div>
          <ActivityIndicator animating={props.loading}/>
        </div>
      </DocumentTitle>
    );
  }
}


export default connect(state => {
  return {
    store: state.product,
    loading: state.loading.global,
  };
})(ProductCategory);
