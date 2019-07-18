import ajax from './ajax'
import jsonp from 'jsonp'
import { resolve } from 'path';
import { reject } from 'q';

const URL=''
 


export const reqLogin=(username,password)=>ajax.post(URL+'/login',{username,password})


export const reqWeather(city){
   return new Promise(resolve,reject)=>{

  
    const url =`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url,{},(error,data)=>{
            if(data.error===0&&!error){
            const {dayPictureUrl,weather}=data.results[0].weather_data[0]
            resolve(dayPictureUrl,weather)
            }else{
                error.message('获取天气信息失败')
            }
        })
    }
}