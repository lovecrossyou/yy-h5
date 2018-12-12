/**
 * Created by zhulizhe on 2018-12-12.
 */
import React from 'react';
import { routerRedux } from 'dva/router';
import {connect} from 'dva';
import DocumentTitle from 'react-document-title';

import {List,Button} from 'antd-mobile';
import styles from './page.css';

const Item = List.Item;

function OperatorMgr() {
  return <DocumentTitle title='员工管理'>
    <div>
      <List renderHeader={() => '角色列表'}>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          arrow="horizontal"
          extra="店长"
          onClick={() => {}}
        >张三</Item>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
          onClick={() => {}}
          arrow="horizontal"
          extra="配送员"
        >
          小王
        </Item>
      </List>

      <div className={styles.btn_confirm}>
        <Button type="primary" >添加</Button>
      </div>
    </div>
  </DocumentTitle>
}

export default connect()(OperatorMgr)
