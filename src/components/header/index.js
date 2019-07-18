import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import StorageUtila from '../../utils/storageUtil'
import MemoryUtils from '../../utils/memoryUtil'
import ajax from '../../aip'
import { Modal } from 'antd';
import MenuList from '../../config/configMenu'
import {formateDate} from '../../utils/dateUtil' 
import LinkButton from '../link-button'
import './index.less'


const { confirm } = Modal


 class Header extends Component{
     state={
         currentTime:formateDate(Date.now()),
         dayUrl:'',
        weather:''
     }
    
    logout=()=>{
        confirm({
            title: MemoryUtils.user.username+'确定退出吗',
            onOk:()=> {
              console.log('OK')
            // 确定后, 删除存储的用户信息
            // local中的
            StorageUtila.removeUtil()
            // 内存中的
            MemoryUtils.user={}
            // 跳转到登陆界面
            this.props.history.replay('/login')
      
            },
            onCancel:()=> {
              console.log('Cancel')
            },
          })
    }
    
    /* 
  根据当前请求的path得到对应的title
  */
    getTitle=()=>{
       let title=''
       const path=this.props.location.pathname 
       MenuList.forEach((item)=>{
            if(item.key===path){
                title=item.title
            }else if(item.children){
                let cItem=item.children.find((cItem)=>cItem.key===path)
                if(cItem){
                    title=cItem.title
                }
            }
       })

       return title
    }


    componentDidMount(){
        this.timerId=setInterval(()=>{
           this.setState({
               currentTime:formateDate(Date.now())
           }) 
        },1000)
    }
    componentWillUnmount(){
        clearInterval(this.timerId)
    }
    
    render(){
       const user=MemoryUtils.user
       let title=this.getTitle();
       let {currentTime,dayUrl,weather}=this.state
        return(
            <div className='header'>
                <header className='header-top'>
                    <span>欢迎,{user.username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </header>
                <header className='header-botton'>
                    <div className='header-botton-left' >{title}</div>
                    <div className='header-botton-right' >
                        <span>{currentTime}</span>
                        <img src='http://api.map.baidu.com/images/weather/day/xiaoyu.png' alt='tianqi'></img>
                        <span>晴</span>
                    </div>
                </header>
            </div>
        )
    }
}
export default withRouter(Header)