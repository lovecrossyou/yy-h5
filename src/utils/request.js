import fetch from 'dva/fetch';

import { getAccessToken } from './authority';

import config from './config';


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const BaseUrl = (url) => {
  return config.apiPrefix + url;
}


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options,type='json') {
  const accessInfo = getAccessToken();
  console.log('accessInfo ',accessInfo);
  const body = options.body ;
  console.log('request ', url);
  console.log('request payload ', body);
  let opt = {} ;
  if(options.method==='get'){
    opt = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: options.method,
    };
  }
  else if (options.method === 'fileupload') {
    const csrfToken = document.cookie.split('=')[1];
    opt.method = 'post';
    const formData = new FormData();
    formData.append('file', options.body.files);
    opt.headers = {
      'x-csrf-token': csrfToken,
    };
    opt.body = formData;
    const response = await fetch('/api' + url, opt);
    const responseJson = response.json();
    return responseJson;

  } else {
    opt = {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: options.method,
    };
    const response = await fetch(BaseUrl(url), opt);
    checkStatus(response);
    if (type !== 'json') return response.text();
    const responseJson = response.json();
    return responseJson;
  }
}
