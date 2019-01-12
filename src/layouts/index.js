import { NavBar, Icon } from "antd-mobile";
import { connect } from "dva";
import router from "umi/router";
import withRouter from "umi/withRouter";

import styles from './index.css';

function BasicLayout(props) {
  console.log('BasicLayout pathname',props)
  console.log('BasicLayout pathname',props.pathname)
  if(props.pathname === "/login/page" ||props.pathname === '/'){
    return (
      <div className={styles.wrapper}>
        {props.children}
      </div>
      )
  }
  return (
    <div className={styles.wrapper}>
      <NavBar
        mode="dark"
        className={styles.nav}
        style={{ backgroundColor: "#FF8638",height:'64px' }}
        icon={
          (props.pathname === "/main" || props.pathname === "/"||props.pathname === "/login/page") ?null: (
            <Icon type="left" size={'lg'}/>
          )
        }
        onLeftClick={() => {
          //这里需要做指定式跳转，手机页面会涉及到用户刷新的问题
          router.go(-1);
        }}
      >
        {props.text}
      </NavBar>
      {props.children}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    text: state.global.text,
    pathname: state.routing.location.pathname
  };
}

export default withRouter(connect(mapStateToProps)(BasicLayout));
