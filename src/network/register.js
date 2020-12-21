import {request} from './request' 
import encryptoSha256 from "js-sha256";
// console.log(encryptoSha256("123456"));
export function checkUserName(username){
    return request({
        method:'GET',
        url:'/user/check/' + username
    })
}
export function toSignUp(username , pwd){
    return request({
        method:'POST',
        url:"/user",
        data:{
            username,
            pwd:'fq' + encryptoSha256(pwd) + 'scjs',
            area: "",
            introduce: "",
            oneWord: "",
            school: "",
            userHome: "",
            fllow: []
        }
    })
}