import storageUtil from './storageUtil'
const user=storageUtil.getUtil()
export default{
    user,//用来存储登陆用户的信息, 初始值为local中读取的user
    product: {},// 需要查看的商品对象
}