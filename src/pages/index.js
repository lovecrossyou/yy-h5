import React from 'react';
import { connect } from 'dva';

import {TabBar} from 'antd-mobile';
import Home from '../pages/home/page'

import home_selected from '../assets/home_selected.png'
import home_icon from '../assets/dianpu.png'


import manage_selected from '../assets/guanli-4@2x.png'
import manage_icon from '../assets/guanli.png'


import me_selected from '../assets/wode-3@2x.png'
import me_icon from '../assets/wode.png'

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
          tintColor="#FF8638"
          barTintColor="white"
        >
          <TabBar.Item
            title="首页"
            key="Home"
            icon={<img style={{width:'22px',height:'22px'}} src={home_icon} alt=''/>
            }
            selectedIcon={<img style={{width:'22px',height:'22px'}} src={home_selected} alt=''/>}
            selected={selectedTab === 'HomeTab'}
            onPress={this.switchTab.bind(this,'HomeTab')}
            data-seed="logId"
          >
            <Home/>
          </TabBar.Item>
          <TabBar.Item
            icon={<img style={{width:'22px',height:'22px'}} src={manage_icon} alt=''/>
            }
            selectedIcon={<img style={{width:'22px',height:'22px'}} src={manage_selected} alt=''/>}
            title="管理"
            key="Manager"
            selected={selectedTab === 'ManagerTab'}
            onPress={this.switchTab.bind(this,'ManagerTab')}
            data-seed="logId1"
          >
            <Manager/>
          </TabBar.Item>
          <TabBar.Item
            icon={<img style={{width:'22px',height:'22px'}} src={me_icon} alt=''/>
            }
            selectedIcon={<img style={{width:'22px',height:'22px'}} src={me_selected} alt=''/>}
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
