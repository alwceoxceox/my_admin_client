import store from 'store'


const USER_KEY='user_key'

export default{
    saveUtil(user){
        store.set(USER_KEY,user)
    },
    getUtil(){
        return store.get(USER_KEY)||{}
    },
    removeUtil(){
        store.remove(USER_KEY)
    }
}