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
export function getQsList(){

}