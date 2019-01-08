import { NavBar, Icon } from "antd-mobile";
import { connect } from "dva";
import router from "umi/router";
import withRouter from "umi/withRouter";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import styles from './index.css';

function BasicLayout(props) {
  // return <div style={{height:'100%'}}> {props.children}</div>;
  console.log('BasicLayout ',props.text);
  return (
    <div className={styles.wrapper}>
      <NavBar
        mode="dark"
        className={styles.nav}
        style={{ backgroundColor: "#FF8638",height:'64px',position:"fixed",zIndex:"11",width:"100%",top:"0" }}
        icon={
          (props.pathname === "/main" || props.pathname === "/") ?null: (
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

      {/*<TransitionGroup>*/}
        {/*<CSSTransition key={props.pathname} classNames="fade" timeout={300}>*/}
          {/*{props.children}*/}
        {/*</CSSTransition>*/}
      {/*</TransitionGroup>*/}


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
