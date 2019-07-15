import ajax from './ajax'

const URL=''
 


export const reqLogin=(username,password)=>ajax.post(URL+'/login',{username,password})