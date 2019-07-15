import React,{Component} from 'react'
import { Form, Icon, Input, Button,message} from 'antd';
import {Redirect} from 'react-router-dom'

import logo from './images/logo.png'
import './login.less'
import {reqLogin} from '../../aip'
import storageUtil from '../../utils/storageUtil'
import memoryUtil from '../../utils/memoryUtil'
 class Login extends Component{
    validatePwd=(rule, value, callback)=>{
         // 1).必须输入
        // 2).必须大于等于4位
        // 3).必须小于等于12位
        // 4).必须是英文、数字或下划线组成
         value=value.trim();
        if(!value){
            callback('必须输入密码');
        }else if(value.length<4){
            callback('密码必须大于等于4位');
        }else if(value.length>12){
            callback('密码必须小于等于12位');
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('必须是英文、数字或下划线组成');
        }else{
            callback();
        }
    }


        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields(async (err, {username,password}) => {
                if (!err) {
                    let result=await reqLogin(username,password)
                    console.log(result)
                    if(result.status===0){
                        this.props.history.replace('/')
                        const user=result.data
                        // localStorage.setItem('user_key',JSON.stringify(user))
                        storageUtil.saveUtil(user)
                        message.success('成功了')
                    }else{
                        message.error(result.msg)
                        
                    }
                }
            });
      };


    render(){
        //  let user=JSON.parse(localStorage.getItem('user_key')||'{}')
        const user=memoryUtil.user
        if(user._id){
           return <Redirect to='/'/>    
        }

        const {getFieldDecorator}=this.props.form
        return (
            <div className='login'>
                <div className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>后台管理系统</h1>
                </div>
                <div className='login-content'>
                    <h2>用户登陆</h2>
                    
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator('username',
                                   {  initialValue: '',rules:[
                                        
                                        // 1).必须输入
                                        // 2). 必须大于等于4位
                                        // 3). 必须小于等于12位
                                        // 4). 必须是英文、数字或下划线组成
                                        { required: true, message: '用户必须填' ,whitespace:true},
                                        {min:4,message:'用户名不小于4'},
                                        {max:12,message:'用户名不小于12'},
                                        {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'}
                                    ]}
                                )(
                                    <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                    />
                                )
                            }
                           
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                            initialValue: '',
                                            rules:[{validator:this.validatePwd}]
                                        }
                                )(<Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                    />)
                            }
                            
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                               登录
                            </Button>
                        </Form.Item>
                     </Form>
                </div>
            </div>
        )
    }
}

const Wraplogin=Form.create()(Login);
export default Wraplogin;