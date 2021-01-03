import {request} from './request' 

function getUsers(){
    return request({
        method:'GET',
        url:'/user'
    })
}
export {getUsers}