import request from './request';

const qiniu = require('qiniu-js');
const config = {
  useCdnDomain: true,
  region: qiniu.region.z1, //华北
};
const putExtra = {
  fname: '',
  params: {},
};

const qiniuUploadTokenURL = '/simple/client/getUploadFileToken';
const qiniuImageURLPrefix = 'http://static.tuexing.com/';

const getUploadToken = async () => {
  return request(qiniuUploadTokenURL, {
    method: 'get',
  }, 'text');
};

const uploadFile = async (file, progress = {}) => {
  const fileName = 'image_' + new Date().getTime() + Math.ceil(Math.random(1000));
  const token = await getUploadToken();
  return new Promise((resolve, rej) => {
    const observable = qiniu.upload(file, fileName, token, putExtra, config);
    const observer = {
      next(res) {
        progress(res);
      },
      error(err) {
        rej(err);
      },
      complete(res) {
        const { hash, key } = res;
        resolve(qiniuImageURLPrefix + key);
      },
    };
    const subscription = observable.subscribe(observer); // 这样传参形式也可以
    // subscription.unsubscribe() // 上传取消

  });
};


module.exports = uploadFile;

