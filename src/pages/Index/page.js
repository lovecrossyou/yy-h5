import React from 'react'
import styles from './page.css'
import Link from 'umi/link';

export default class Home extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Link to="/settled/page"><h1>店铺入驻</h1></Link>
        <Link to="/login/page"><h1>登录/注册</h1></Link>
        <Link to="/home/page"><h1>首页</h1></Link>
        <Link to="/product/productcategory"><h1>分类</h1></Link>
        <Link to="/product/page"><h1>商品编辑</h1></Link>
        <Link to="/manage/page"><h1>管理</h1></Link>
        <Link to="/withdraw/page"><h1>提现</h1></Link>
        <Link to="/withdraw/addbank"><h1>添加银行卡</h1></Link>
        <Link to="/classify/page"><h1>商品列表</h1></Link>
      </div>
    );
  }
}
