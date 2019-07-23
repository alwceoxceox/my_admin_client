import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import StorageUtila from '../../utils/storageUtil'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions'
import {reqWeather} from '../../aip'
import { Modal } from 'antd';
import MenuList from '../../config/configMenu'
import {formateDate} from '../../utils/dateUtil' 
import LinkButton from '../link-button'
import './index.less'


const { confirm } = Modal


 class Header extends Component{
     state={
         currentTime:formateDate(Date.now()),
         dayPictureUrl:'',
        weather:''
     }
    

     /* 
        退出登陆
    */
    logout=()=>{
       confirm({
            title: '确认退出吗?',
            onOk:()=> {
              console.log('OK')
             this.props.logout()
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
                let cItem=item.children.find((cItem)=>path.indexOf(cItem.key)===0)
                if(cItem){
                    title=cItem.title
                }
            }
       })

       return title
    }

    //    获取天气
    getWeather=async()=>{
        
       let {dayPictureUrl,weather}=await reqWeather('北京')
        this.setState({dayPictureUrl,weather})
    }
    getTime=()=>{
            // 每隔1s获取当前时间, 并更新状态数据currentTime
        this.timerId=setInterval(()=>{
            const currentTime=formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }
    componentDidMount(){
       this.getTime()
       this.getWeather()
    }
    componentWillUnmount(){
        clearInterval(this.timerId)
    }
    
    render(){
       const user=this.props.user
       let title=this.props.headerTitle
       let {currentTime,dayPictureUrl,weather}=this.state
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
                        <img src={dayPictureUrl} alt={weather}></img>
                        <span>{weather}</span>
                    </div>
                </header>
            </div>
        )
    }
}
export default connect(
    state=>({
        headerTitle:state.headerTitle,
        user:state.user
    }), // state: 总状态  {headerTitle, user}
    {logout}
)(withRouter(Header))