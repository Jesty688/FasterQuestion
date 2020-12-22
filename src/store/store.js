const state = {
    loginStatus:{
        userName:window.sessionStorage.getItem('userName'),
        token:window.sessionStorage.getItem('token'),
        avaterUrl:window.sessionStorage.getItem('avaterUrl'),
        loginTip:false
    }
}
export default state;