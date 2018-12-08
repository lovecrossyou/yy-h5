import React from 'react';

import {TabBar} from 'antd-mobile';
import Home from './Index/page'
import Manager from './manage/page'

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'HomeTab',
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

  render() {
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
            selected={this.state.selectedTab === 'HomeTab'}
            badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'HomeTab',
              });
            }}
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
            selected={this.state.selectedTab === 'ManagerTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'ManagerTab',
              });
            }}
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
            selected={this.state.selectedTab === 'MineTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'MineTab',
              });
            }}
          >
            {this.renderContent('Mine')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

