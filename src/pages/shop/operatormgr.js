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

function OperatorMgr(props) {
  const {userList} = props.store ;
  return <DocumentTitle title='员工管理'>
    <div>
      <List renderHeader={() => '角色列表'}>
        {
          userList.map((user,index)=>{
            return (
              <Item
                key={index+'#'}
                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                arrow="horizontal"
                extra={user.roleContent}
                onClick={() => {
                  props.dispatch(routerRedux.push('/shop/operatoredit'))
                }}
              >{user.cnName}</Item>
            )
          })
        }
      </List>

      <div className={styles.btn_confirm}>
        <Button type="primary" >添加</Button>
      </div>
    </div>
  </DocumentTitle>
}

export default connect(state=>{
  return {
    store:state.shop
  }
})(OperatorMgr)
