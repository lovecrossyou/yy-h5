import { connect } from 'dva';
import { Result,Button } from 'antd-mobile';
import styles from './page.css';
import router from 'umi/router';
import React from 'react';
const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt=""/>;
const ApplyResult = (props) => {
  const {shopParamInfo} = props.store ;
  let adminMobilePhone = shopParamInfo.adminMobilePhone ;
  const pre = adminMobilePhone.substring(0,3);
  const sufix = adminMobilePhone.substr(adminMobilePhone.length-4,4);
  const message = '工作人员会在1-3个工作日内进行审核，审核结果会短信通知(' + pre + '****' + sufix +')手机号码';
  console.log(message);
  return (<div className="result-example">
    <Result
      img={myImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
      title="提交完成，请等待审核结果"
      message={message}
    />
    <div className={styles.footer_btn}>
      <Button type="primary" onClick={() => {
        router.replace('/');
      }}>确定</Button>
    </div>
  </div>);
}

export default connect(state=>{
  return {
    store:state.settled
  }
})(ApplyResult);
