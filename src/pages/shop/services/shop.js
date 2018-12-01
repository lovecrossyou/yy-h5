import request from "../../../utils/request";

export async function query (params) {
  return request('/mp/simple/client/adList',{
    method:'get',
  });
}
