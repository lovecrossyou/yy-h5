import React from 'react'
import { connect } from "dva";
import { ImagePicker, WingBlank } from 'antd-mobile';

const data = [];

class ImagePickerWrapper extends React.Component {
  state = {
    files: data,
  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
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
