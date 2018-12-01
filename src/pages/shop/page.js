/**
 * Created by zhulizhe on 2018-12-01.
 */

import React from 'react';
import { routerRedux } from 'dva/router';
import {connect} from 'dva';

import {List, InputItem, WhiteSpace, Button, WingBlank, ImagePicker, Icon} from 'antd-mobile';
import {createForm} from 'rc-form';
import styles from './page.css'

class Shop extends React.Component{
  render() {
    return <div>
      我的店铺
    </div>
  }
}


export default connect(state=>{
  return {
    store:state.shop
  }
})(Shop)
