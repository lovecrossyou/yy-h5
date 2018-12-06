import { connect } from "dva";

import { Result, Icon, WhiteSpace } from 'antd-mobile';

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

const ApplyResult = () => (<div className="result-example">
  <Result
    img={myImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
    title="提交完成，请等待审核结果"
    message="工作人员会在1-3个工作日内进行审核，审核结果会短信通知（183****0183）手机号码"
  />
</div>);

export default connect()(ApplyResult)
