const mutations = {
    triggerTip(state , payload){
        state.loginStatus.loginTip = payload
    },
    // 保存登录状态(简单取6位经base64加密)
    // 坑(如果没有经过state修改state中的属性值那么这个结果是不同步的。。。)
    setToken(state){
        // 这里也不是算直接吧 state是间接的获取sessionStorage中的值 然后这个地方修改了
        // 没有经过state自然是不会响应式更新的 所以这里先直接经过state直接修改这3个值
        const token = Math.ceil(Math.random()*1000000)
        window.sessionStorage.setItem('token' , window.btoa(token))
        state.loginStatus.token = token
    },
    setAvater(state , url){
        state.loginStatus.avaterUrl = url;
        window.sessionStorage.setItem('avaterUrl' , url)
    },
    setUsername(state , uname){
        state.loginStatus.userName = uname;
        window.sessionStorage.setItem('userName' , uname)
    },
    // 保存答题记录
    setAnsHistory(state , item){
        state.loginStatus.ansHistory = item;
        window.sessionStorage.setItem('ansHistory' , item)
    }, 
    // 清楚所有sessionStorage
    sessionClear(state){
       this.commit('setAvater' , '')
       this.commit('setUsername' , '')
       state.loginStatus.token = ""
       window.sessionStorage.clear();
    }
}
export default mutations