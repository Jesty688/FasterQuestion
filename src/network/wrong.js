// 错题
import {request} from './request'

function setErrQs(id , dt){
    return request({
        method:'PUT',
        url:"/user/" + id,
        data:{
            username:dt.username,
            pwd:dt.pwd,
            area: dt.area,
            introduce: dt.introduce,
            oneWord: dt.introduce,
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