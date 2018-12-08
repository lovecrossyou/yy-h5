export function getAccessToken() {

  return {"app_key":"b5958b665e0b4d8cae77d28e1ad3f521","signature":"BD60133D4A74C4926FD592E8DD85BE94","access_token":"3550f4cf636a48d3b91417cbca29f851"}
  const token = localStorage.getItem('accessToken') ;
  return token===undefined? '' : token ;
}

export function setAccessToken(authority) {
  if(authority&&authority!=undefined){
    return localStorage.setItem('accessToken', authority);
  }
}
