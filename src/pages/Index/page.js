import React from 'react'
import styles from './page.css'
import Link from 'umi/link';

export default class Home extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Link to="/settled/page"><h1>店铺入驻</h1></Link>
        <Link to="/login/page"><h1>登录/注册</h1></Link>
        <Link to="/shop/page"><h1>首页</h1></Link>
      </div>
    );
  }
}
