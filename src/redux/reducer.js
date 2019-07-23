/* 
管理状态数据的reducer函数
*/
import {combineReducers} from 'redux'
import storageUtil from '../utils/storageUtil'

import {
    SET_HEADER_TITLE,
    RECEIVE_USER,
    SHOW_ERROR,
    LOGOUT
} from './action-type'
import { message } from 'antd';


/* 
管理应用头部标题的reducer函数
*/
const initHeaderTitle='首页'
function headerTitle(state=initHeaderTitle,action){
    switch(action.type){
        case SET_HEADER_TITLE:
            return action.data
        default:
            return state
    }
}


/* 
管理登陆用户的reducer函数
*/
 // 读取local中保存user作为初始值
 const initUser=storageUtil.getUtil()
 function user(state=initUser,action){
    switch(action.type){
        case RECEIVE_USER:
          return action.user
        case SHOW_ERROR:
          return {...state,errorMsg:action.errorMsg}
        case LOGOUT:
          return {}
        default:
          return state
    }
 }

 
/* 
combineReducers()返回的是一个新的reducer函数(总reducer函数)
总的state的结构:
  {
    headerTitle: headerTitle(),  // ''
    user: user()  // {}
  }
*/
const reducer=combineReducers({
    headerTitle,
    user
}
)
export default reducer