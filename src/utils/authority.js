export function getAccessToken() {
  const token = localStorage.getItem('accessToken') ;
  return token===null? '' : JSON.parse(token);
}

export function setAccessToken(authority) {
  if(authority&&authority!=undefined){
    return localStorage.setItem('accessToken', JSON.stringify(authority));
  }
}
