import { connect } from 'dva';
import { Result } from 'antd-mobile';
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
  </div>);
}

export default connect(state=>{
  return {
    store:state.settled
  }
})(ApplyResult);
