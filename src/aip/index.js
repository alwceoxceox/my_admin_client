import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd';

const BASE=''
 


export const reqLogin=(username,password)=>ajax.post(BASE+'/login',{username,password})

// return new Promise((resolve, reject) => {
//     const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
//     // 发送jsonp请求
//     jsonp(url, {}, (err, data) => {
//       console.log('jsonp()', err, data)
//       // 如果成功了
//       if (!err && data.status==='success') {
//         // 取出需要的数据
//         const {dayPictureUrl, weather} = data.results[0].weather_data[0]
//         resolve({dayPictureUrl, weather})
//       } else {
//         // 如果失败了
//         message.error('获取天气信息失败!')
//       }

//     })
//   })
export const reqWeather = (city) => {

    return new Promise((resolve, reject) => {
      const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
      // 发送jsonp请求
      jsonp(url, {}, (err, data) => {
        console.log('jsonp()', err, data)
        // 如果成功了
        if (!err && data.status==='success') {
          // 取出需要的数据
          const {dayPictureUrl, weather} = data.results[0].weather_data[0]
          resolve({dayPictureUrl, weather})
        } else {
          // 如果失败了
          message.error('获取天气信息失败!')
        }
  
      })
    })
  }



  // 获取分类列表
  export const reqCategorys=()=>ajax(BASE+'/manage/category/list')


// 根据分类id获取分类
export const reqCategory=(categoryId)=>ajax(BASE+'/manage/category/info',{
  params:{categoryId}
})


  // 添加分类


  export const reqAddCategory=(categoryName)=>ajax.post(BASE+'/manage/category/add',{categoryName})

  // 更新分类
  export const reqUpdateCategory=({categoryId,categoryName})=>ajax.post(BASE+'/manage/category/update',{categoryId,categoryName})


  /* 获取商品分页列表 */
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {
  params: { // 包含所有query参数的对象
    pageNum,
    pageSize
  }
})



/* 根据Name/desc搜索产品分页列表 */
export const reqSearchProducts=( {
  pageNum,
  pageSize,
  searchName,
  searchType // 它的值是'productName'或者'productDesc'
})=>ajax(BASE+'/manage/product/search',{
  params:{
    pageNum,
    pageSize,
    [searchType]: searchName
  }
})


// 上架或下架的状态
export const reqUpdateStatus=(productId,status)=>ajax.post('/manage/product/updateStatus',{productId,status})




// 删除图片
export const reqDeleteImg=(name)=>ajax.post('/manage/img/delete',{name})


// 添加或修改商品
export const reqAddUpdateProduct=(product)=>ajax.post( BASE + '/manage/product/' + (product._id ? 'update' : 'add'), product)



// 获取所有角色的列表
export const reqRoles =()=>ajax(BASE+'/manage/role/list')
// 添加角色
export const reqAddRoles =(roleName)=>ajax.post(BASE+'/manage/role/add',{roleName})
// 更新角色
export const reqUpdateRoles =(role)=>ajax.post(BASE+'/manage/role/update',role) //???
// 获取所有用户的列表
export const reqUser=()=>ajax(BASE+'/manage/user/list')
// 删除指定用户
export const reqDeleteUser=(userId)=>ajax.post(BASE+'/manage/user/delete',{userId})
// 添加/更新用户
export const reqAddUpdateUser=(user)=>ajax.post(BASE+'/manage/user/'+(user._id?'update':'add'),user)
