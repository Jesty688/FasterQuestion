import {request} from './request' 

function getUserInfo(id){
    return request({
        method:'GET',
        url:'/user/' + id
    })
}
export {getUserInfo}