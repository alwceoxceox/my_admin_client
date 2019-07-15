import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import storageUtil from '../../utils/storageUtil'
import memoryUtil from '../../utils/memoryUtil';

export default class Admin extends Component{
    render(){
            const user=memoryUtil.user
                if(!user._id){
                    return <Redirect to='/login'/> 
                }
        return (
                <div>你好！{user.username}</div>
        )
    }
}