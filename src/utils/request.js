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

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {

  console.log('request ', url);

  const accessToken = getAccessToken();
  let opt;
  if (options.method === 'get') {
    opt = {
      headers: {
        'accessToken': accessToken,
        'Content-Type': 'application/json',
      },
      method: options.method,
    };
  }
  else {
    opt = {
      body: JSON.stringify(options.body),
      headers: {
        'accessToken': accessToken,
        'Content-Type': 'application/json',
      },
      method: options.method,
    };
  }
  console.log('opt ', opt);
  const response = await fetch(config.apiPrefix+ url, opt);
  checkStatus(response);
  return response.json();
}
