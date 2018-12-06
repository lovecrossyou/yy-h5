/**
 * Created by zhulizhe on 2018-12-01.
 */

import React from 'react';
import { connect } from "dva";
import { routerRedux } from 'dva/router';
import {List, InputItem, WhiteSpace, SearchBar, WingBlank, Icon} from 'antd-mobile';
import { Map,MouseTool } from 'react-amap';
import styles from './page.css'

const AMAP_KEY = '636cecc12ec156b92252622edecfa8f5' ;
const VERSION = '1.4.8' ;


const AddressItem = ()=>{
  return <div className={styles.address}>
    <div className={styles.addr_title}>紫荆雅苑小区</div>
    <div className={styles.addr_sub_title}>北京市通州区胡通路</div>
  </div>
}


class MapPage extends React.Component {

  constructor(){
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

  onChange = text=>{
    console.log(text);
  }

  render() {
    return (
      <div className={styles.container}>
        {/*地图*/}
        <div className={styles.map_wrapper}>
          <Map amapkey={AMAP_KEY}
               plugins={this.mapPlugins}
               center={this.mapCenter}
               version={VERSION}>
            <MouseTool events={this.toolEvents}/>
          </Map>
          {/*搜索框*/}
         <div className={styles.search_wrapper}>
           <SearchBar
             onChange={this.onChange}
             placeholder="搜索地址"
             maxLength={8}
             showCancelButton={false} />
         </div>
          {/*中心点*/}
          <div className={styles.center_wrapper}>
            <div className={styles.center}></div>
          </div>
        </div>
        {/*地址列表*/}
        <div className={styles.address_wrapper}>
          <AddressItem/>
          <AddressItem/>
        </div>
      </div>
    );
  }
}


export default connect()(MapPage);
