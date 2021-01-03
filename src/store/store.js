const state = {
    loginStatus:{
        userName:window.localStorage.getItem('userName'),
        token:window.localStorage.getItem('token'),
        avaterUrl:window.localStorage.getItem('avaterUrl'),
        ansHistory:window.localStorage.getItem('ansHistory'),
        loginTip:false
    }
}
export default state;