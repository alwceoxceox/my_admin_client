import React, { Component } from 'react'
/**
 * 用户管理
 */
import {Card,Table,Modal,Button, message} from 'antd'
import UserForm from './user-form'
import {formateDate} from '../../utils/dateUtil'
import {reqDeleteUser,reqAddUpdateUser,reqUser} from '../../aip'


import LinkButton from '../../components/link-button'








export default class User extends Component {
  state={
    users:[],
    roles:[],
    isShow:false
  }
  initColumns=()=>{
    this.columns=[
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },

      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        // render: role_id => this.state.roles.find(role => role._id===role_id).name
        render: role_id => this.roleNames[role_id]
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        )
      }
    ]
  }

  /*
  显示添加界面
   */
showAdd=()=>{
  // 去除前面保存的user
  this.user=null
  this.setState({isShow:true})
}

 /*
  显示修改界面
   */
  showUpdate=(user)=>{
    this.user=user
    this.setState({isShow:true})
  }




  /*
  删除指定用户
   */

  deleteUser=(user)=>{
    Modal.confirm({
      title:`确认删除${user.username}吗?`,
      onOk: async () => {
       const result=await reqDeleteUser(user._id)
       if(result.status===0){
        message.success('删除用户成功!')
        this.getUsers()
       }else{
         message.error(result.msg)
       }
      }
    })
  }


 /*
  添加/更新用户
   */
  addOrUpdateUser=async()=>{
    this.setState({isShow:false})
    this.form.validateFields(async(err,values)=>{
      if(!err){
        // 如果this有user
        if(this.user){
          values._id=this.user._id
        }
        const result=await reqAddUpdateUser(values)
        if(result.status===0){
          message.success((result._id?'更新':'添加')+'成功了')
         this.getUsers()
        }else{
          message.error(result.msg)
        }
      }
    })
    
  }

  getUsers=async()=>{
    const result=await reqUser()
    if(result.status===0){
      const {users,roles}=result.data

        // 生成一个对象容器(属性名: 角色的ID值, 属性值是角色的名称)
      this.roleNames=roles.reduce((pre,role)=>{
        pre[role._id]=role.name
        return pre
      },{})
      this.setState({users,roles})
    } 
  }
componentWillMount(){
  this.initColumns()
}
componentDidMount(){
  this.getUsers()
}

  render() {
    const {users,roles,isShow}=this.state
    const user=this.user||{}



    const title=<Button onClick={this.showAdd}>创建用户</Button>
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={users}
          columns={this.columns}
          pagination={{defaultPageSize: 2}}
        />

        <Modal
          title={user._id ? '修改用户' : '添加用户'}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.form.resetFields()
            this.setState({isShow: false})
          }}
        >
            <UserForm
              setForm={form => this.form = form}
              roles={roles}
              user={user}
            />
        </Modal>

    </Card>
    )
  }
}
