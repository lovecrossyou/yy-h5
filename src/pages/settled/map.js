/**
 * Created by zhulizhe on 2018-12-01.
 */

import React from 'react';
import {connect} from "dva";
import router from 'umi/router';
import {List, InputItem, WhiteSpace, SearchBar, WingBlank, Icon} from 'antd-mobile';
import styles from './page.css'


const AddressItem = ({data, onClick}) => {
  return <div className={styles.address} onClick={onClick}>
    <div className={styles.addr_title}>{data.name}({data.address})</div>
    <div className={styles.addr_sub_title}>{data.cityname + data.adname}</div>
  </div>
}


class MapPage extends React.Component {

  constructor() {
    super();
    const self = this;
    this.toolEvents = {
      created: (tool) => {
        console.log(tool)
        self.tool = tool;
      }
    }
    this.mapPlugins = ['ToolBar'];
    this.mapCenter = {longitude: 120, latitude: 35};
  }


  onChange = text => {
    console.log(text);
    this.props.dispatch({
      type: 'settled/searchPlace',
      payload: text
    })
  }

  onClick = addr => {
    const addressName = addr.name + addr.address;
    const location = addr.location;
    let longitude = ''
    let latitude = ''
    if (location) {
      longitude = location.split(',')[0];
      latitude = location.split(',')[1];
    }
    const locationInfo = {
      addressName,
      longitude,
      latitude
    }
    console.log('locationInfo ', locationInfo)
    this.props.dispatch({
      type: 'settled/saveLocationInfo',
      payload: locationInfo
    })
    this.props.dispatch({
      type: 'shop/saveLocationInfo',
      payload: locationInfo
    })
    router.goBack();
  }

  render() {
    const {addrList} = this.props.store;

    console.log('store ', this.props.store);
    return (
      <div className='global_container'>
        <div className={styles.container}>
          {/*地图*/}
          <div className={styles.map_wrapper}>
            {/*搜索框*/}
            <div className={styles.search_wrapper}>
              <SearchBar
                onChange={this.onChange}
                placeholder="搜索地址"
                maxLength={8}
                autoFocus={true}
                showCancelButton={false}/>
            </div>
          </div>
          {/*地址列表*/}
          <div className={styles.address_wrapper}>
            {addrList.map((addr, index) => {
              return <AddressItem
                onClick={this.onClick.bind(this, addr)}
                data={addr}
                key={index + '#'}/>
            })}
          </div>
        </div>
      </div>
    );
  }
}


export default connect(state => {
  return {
    store: state.settled
  }
})(MapPage);
