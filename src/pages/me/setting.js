/**
 * Created by zhulizhe on 2018-12-17.
 */
import { connect } from 'dva';
import { Toast ,List} from 'antd-mobile';
import styles from './page.less';
import router from 'umi/router';
import { removeToken } from '../../utils/authority';
import DocumentTitle from 'react-document-title';

const Item = List.Item


function Setting(props) {
  return <DocumentTitle title='设置'>
    <List className={styles.items}>
      <Item
        arrow="horizontal"
        onClick={() => {}}
      >意见反馈</Item>
      <Item
        arrow="horizontal"
        onClick={() => {
          // router.push('/me/setting')
        }}
      >修改密码</Item>
      <Item
        arrow="horizontal"
        onClick={() => {
          removeToken();
          Toast.show('已注销当前账户')
          router.replace('/')
        }}
      >注销</Item>
    </List>
  </DocumentTitle>
}

export default connect()(Setting)


