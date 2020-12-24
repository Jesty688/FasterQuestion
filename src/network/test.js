// 侧滑 - 练习题型 所有请求
import {request} from './request'

// 获取题型
export function getQsType(){
    return request({
        method:"GET",
        url:'/questionType'
    });
}

// 获取题型所对应的所有题目
export function getQsList(type , page){
    return request({
        method:"GET",
        url:`/questionList?题型=${type}&_page=${page}&_limit=50`,
    })
}
// 获取对应题型的数量
export function getQsCount(type){
    return request({
        method:'GET',
        url:`/questionList/count/${type}`
    })
}