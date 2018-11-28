export function getAccessToken() {

  // return 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNTQxMzMzODQ5LCJzdWIiOiJEWjAwMDAxMTMwIn0.29c_6eJA3-pbUcp9Oz2GQibVpNvMaIngTYDCdLpN_44'
  const token = localStorage.getItem('accessToken') ;
  return token===undefined? '' : token ;
}

export function setAccessToken(authority) {
  if(authority&&authority!=undefined){
    return localStorage.setItem('accessToken', authority);
  }
}
