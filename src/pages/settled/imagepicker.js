import React from 'react'

import {connect} from "dva";
import {ImagePicker, WingBlank, Button, Toast} from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import styles from './page.css';
import router from 'umi/router';


class ImagePickerWrapper extends React.Component {
  state = {
    files: [],
  }
  onChange = (files, type, index) => {
    // return;
    if (type === 'add') {
      //上传图片
      this.props.dispatch({
        type: 'global/upload',
        payload: files[0].file,
        cb: imgUrl => {
          console.log('imgData ', imgUrl)
          this.props.dispatch({
            type: 'settled/saveProductImageUrl',
            payload: imgUrl
          });
          this.setState({
            files
          });
        },
        progressPercent: data => {
          Toast.show(data);
        }
      })
    }
    else if (type === 'remove') {
      this.setState({
        files
      });
      //删除图片
      this.props.dispatch({
        type: 'settled/removeImageUrl',
        payload: index
      })
    }
  }

  handleClick = () => {
    router.goBack();
  }

  render() {
    const {files} = this.state;
    return (
      <DocumentTitle title='上传图片'>
        <div className='global_container'>
          <WingBlank>
            <ImagePicker
              files={files}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < 9}
              multiple={false}
            />
            <div className={styles.footer_btn}>
              <Button type="primary" onClick={this.handleClick}>完成</Button>
            </div>
          </WingBlank>
        </div>
      </DocumentTitle>
    );
  }
}


export default connect()(ImagePickerWrapper)
