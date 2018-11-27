import {List, InputItem, WhiteSpace, Button, WingBlank} from 'antd-mobile';
import {createForm} from 'rc-form';

const Item = List.Item;

class Settled extends React.Component {
  componentDidMount() {
    // this.autoFocusInst.focus();
  }

  handleClick = () => {
    this.inputRef.focus();
  }

  confirmClick = () => {
    this.props.form.validateFields((error, value) => {
      console.log('error ',error)
      console.log('value ',value)
    })
  }

  render() {
    const {getFieldProps} = this.props.form;
    return (
      <WingBlank>
        <List renderHeader={() => '店铺信息'}>
          <InputItem
            {...getFieldProps('shopName')}
            clear
            placeholder="店铺信息"
            ref={el => this.autoFocusInst = el}
          >店铺名称</InputItem>
          <Item extra="北京市西城区百万庄大街" arrow="horizontal" onClick={() => {
          }}>店铺地址</Item>
        </List>
        <WhiteSpace/>
        <List renderHeader={() => '用户信息'}>
          <InputItem
            {...getFieldProps('userName')}
            placeholder="姓名"
          >姓名</InputItem>
          <InputItem
            {...getFieldProps('phoneNum')}
            type="phone"
            placeholder="手机号码"
          >手机号码</InputItem>
        </List>
        <WhiteSpace/>
        <List renderHeader={() => '提现信息'}>
          <InputItem
            {...getFieldProps('bankCard', {
              initialValue: '',
            })}
            type="bankCard"
            placeholder="1234 5678 0000"
          >提现银行卡</InputItem>
        </List>
        <WhiteSpace/>
        <WhiteSpace/>
        <Button type="primary" onClick={this.confirmClick}>确认</Button>

      </WingBlank>
    );
  }
}

const
  SettledWrapper = createForm()(Settled);
export default SettledWrapper
