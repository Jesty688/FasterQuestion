// 错题
import {request} from './request'

function setErrQs(id , dt){
    return request({
        method:'PUT',
        url:"/user/" + id,
        data:{
            username:dt.username,
            pwd:dt.pwd,
            avaurl:dt.avaurl,
            area: dt.area,
            introduce: dt.introduce,
            oneWord: dt.oneWord,
            school: dt.school,
            userHome: dt.userHome,
            fllow: dt.fllow,
            errCollect:dt.errCollect,
            id
        }
    })
}
function getErrQs(id){
    return request({
        method:"GET",
        url:'/user/' + id,
    });
}
export {setErrQs , getErrQs }