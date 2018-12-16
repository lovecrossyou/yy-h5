import React from 'react'

import { connect } from "dva";
import { ImagePicker, WingBlank } from 'antd-mobile';


class ImagePickerWrapper extends React.Component {
  state = {
    files: [],
  }
  onChange = (files, type, index) => {
    // return;
    if(type === 'add'){
      //上传图片
      this.props.dispatch({
        type:'global/upload',
        payload:files[0].file,
        cb:imgUrl=>{
          console.log('imgData ',imgUrl )
          this.props.dispatch({
            type:'product/saveProductImageUrl',
            payload: imgUrl
          });
          this.setState({
            files
          });
        }
      })
    }
    else if(type === 'remove'){
      this.setState({
        files
      });
      //删除图片
      this.props.dispatch({
        type:'product/removeImageUrl',
        payload:index
      })
    }
  }


  render() {
    const { files } = this.state;
    return (
      <WingBlank>
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 9}
          multiple={false}
        />
      </WingBlank>
    );
  }
}


export default connect()(ImagePickerWrapper)
