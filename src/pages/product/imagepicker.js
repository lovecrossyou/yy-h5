import React from 'react'

import {connect} from "dva";
import {ImagePicker, WingBlank, Button, Toast} from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import styles from './page.css';
import router from 'umi/router';


class ImagePickerWrapper extends React.Component {

  componentDidMount() {
    const {formData} = this.props.product ;
    const productUrlFiles = formData.detailImages.map(url=>{
      return {
        url:url
      }
    });
    console.log('productUrlFiles ',productUrlFiles)
    console.log('formData ',formData)
    this.savePictures(productUrlFiles);
  }


  componentWillUnmount() {
    const {formData} = this.props.product ;
    const productUrlFiles = formData.detailImages.map(d=>d.url);
    this.savePictures(productUrlFiles);
  }

  savePictures = files=>{
    this.props.dispatch({
      type:'product/savePictures',
      payload:files
    })
  }

  addPicture = url=>{
    this.props.dispatch({
      type:'product/addPicture',
      payload:url
    })
  }


  removePicture = index=>{
    this.props.dispatch({
      type: 'product/removePictureAtIndex',
      payload: index
    })
  }

  onChange = (files, type, index) => {

    if (type === 'add') {

      console.log('files### ',files);
      const index = files.length -1 ;
      //上传图片
      this.props.dispatch({
        type: 'global/upload',
        payload: files[index].file,
        cb: imgUrl => {
          console.log('imgUrl ', imgUrl)
          this.addPicture(imgUrl);
        },
        progressPercent: data => {
          Toast.show(data);
        }
      })
    }
    else if (type === 'remove') {
      //删除图片
      this.removePicture(index);
    }
  }

  handleClick = () => {

    router.goBack();
  }

  render() {
    const {formData} = this.props.product ;
    return (
      <DocumentTitle title='上传图片'>
        <div className='global_container'>
          <WingBlank>
            <ImagePicker
              files={formData.detailImages}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={formData.detailImages.length < 9}
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


export default connect(state=>{
  return {
    product:state.product
  }
})(ImagePickerWrapper)
