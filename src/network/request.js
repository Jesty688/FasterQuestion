// 封装axios
import axios from 'axios'
export function request(config){
    // 实例化axios 并且配置相关信息
    const instance = new axios.create({
        baseURL:'http://127.0.0.1:6888',
        timeout:5000,
        headers:{
            // 'Content-Type':'application/x-www-form-urlencoded'
            'Content-Type':'application/json'
        }
    });
    // 请求拦截
    instance.interceptors.request.use(config => {
        //拦截后需要将拦截下来的请求数据返回发送
        return config;
    } , err => {
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    } , err => {
        console.log(err)
    })
    return instance(config)
}