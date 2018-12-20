import React from 'react';
import { connect } from 'dva';

import {TabBar} from 'antd-mobile';
import Home from '../pages/home/page'
import Manager from './manage/page'
import Me from './me/page'

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      fullScreen: false,
    };
  }

  renderContent(pageText) {
    return (
      <div style={{backgroundColor: 'white', height: '100%', textAlign: 'center'}}>
        <div style={{paddingTop: 60}}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9'}}
           onClick={(e) => {
             e.preventDefault();
             this.setState({
               hidden: !this.state.hidden,
             });
           }}
        >
          Click to show/hide tab-bar
        </a>
        <a style={{display: 'block', marginBottom: 600, color: '#108ee9'}}
           onClick={(e) => {
             e.preventDefault();
             this.setState({
               fullScreen: !this.state.fullScreen,
             });
           }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
  }

  getTabNameString = tab=>{
    if(tab === 'HomeTab')return '首页' ;
    if(tab === 'ManagerTab')return '管理' ;
    if(tab === 'MineTab')return '我' ;
    return '' ;
  }

  switchTab = tabName =>{
    console.log('tabName ',tabName)
    this.props.dispatch({
      type:'global/saveTabName',
      payload:tabName
    })

    this.props.dispatch({
      type:'global/setText',
      payload:this.getTabNameString(tabName)
    })
  }

  render() {
    const {selectedTab} = this.props.store ;
    console.log('selectedTab ',selectedTab)
    return (
      <div style={{position: 'fixed', height: '100%', width: '100%'}}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="Home"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
            }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
            }}
            />
            }
            selected={selectedTab === 'HomeTab'}
            badge={1}
            onPress={this.switchTab.bind(this,'HomeTab')}
            data-seed="logId"
          >
            <Home/>
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
              }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
              }}
              />
            }
            title="管理"
            key="Manager"
            selected={selectedTab === 'ManagerTab'}
            onPress={this.switchTab.bind(this,'ManagerTab')}
            data-seed="logId1"
          >
            <Manager/>
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
              }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
              }}
              />
            }
            title="我的"
            key="Mine"
            selected={selectedTab === 'MineTab'}
            onPress={this.switchTab.bind(this,'MineTab')}
          >
            <Me/>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}


export default connect(state=>{
  return {
    store:state.global,
    shop:state.shop
  }
})(Index)
