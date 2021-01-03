import {request} from './request' 
import encryptoSha256 from "js-sha256";
// console.log(encryptoSha256("123456"));
// 检查用户名是否重复
export function checkUserName(username){
    return request({
        method:'GET',
        url:'/user/check/' + username
    })
}
// 注册用户
export function toSignUp(username , pwd){
    return request({
        method:'POST',
        url:"/user",
        data:{
            username,
            pwd:'fq' + encryptoSha256(pwd) + 'scjs',
            avaurl:'https://imgavater.ui.cn/avatar/max.png',
            area: "",
            introduce: "",
            oneWord: "",
            school: "",
            userHome: "",
            fllow: [],
            errCollect:[]
        }
    })
}
// 用户登录
export function toSignIn(username , pwd){
    return request({
        method:"GET",
        url:`/user/login/${username}/${'fq' + encryptoSha256(pwd) + 'scjs'}`,
    })
}