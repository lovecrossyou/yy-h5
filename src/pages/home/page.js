import {List, InputItem, WhiteSpace} from 'antd-mobile';
import styles from './page.css'
import Link from 'umi/link';

export default class Home extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Link to="/settled/page"><h1>店铺入驻</h1></Link>
      </div>
    );
  }
}
