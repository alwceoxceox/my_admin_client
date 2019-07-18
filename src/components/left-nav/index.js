import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu,Icon } from 'antd';
import logo from '../../assets/images/logo.png'
import './index.less'
import menuList from '../../config/configMenu'




const { SubMenu } = Menu;


 class LeftNav extends Component{

    // getMeauList=(meauList)=>{
    //     return meauList.map((item)=>{
    //         if(!item.children){
    //             return(
    //                 <Menu.Item key={item.key}>
    //                     <Link to={item.key}>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </Link>
                        
    //                 </Menu.Item>
    //             )
    //         }else{
    //             return (
    //                 <SubMenu
    //                     key={item.key}
    //                     title={
    //                     <span>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </span>
    //                     }
    //                 >
    //                    {this.getMeauList(item.children)}
    //                 </SubMenu>
    //             )
    //         }
    //     })
    // }

    getMenuNodes2=(menuList)=>{
        const path=this.props.location.pathname
        return menuList.reduce((pre,item)=>{
            if(!item.children){
                pre.push(
                     <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                const cItem=item.children.find((cItem)=>cItem.key===path)
                if(cItem){
                    this.openKey=item.key
                }
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </span>
                        }
                    >
                        {this.getMenuNodes2(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        },[])

    }




    // getMenuNodes=(menuList)=>{
    //     return menuList.map((item)=>{
    //         if(!item.children){
    //             return (
    //                 <Menu.Item key={item.key}>
    //                   <Link to={item.key}>
    //                     <Icon type={item.icon} />
    //                     <span>{item.title}</span>
    //                   </Link>
    //                 </Menu.Item>
    //             )
    //         }else{
    //             // 如果当前请求路由与当前菜单的某个子菜单的key匹配, 将菜单的key保存为openKey
    //             // const cItem=item.childern.find((cItem)=>{cItem.key===path})
    //             // if(cItem){
    //             //     this.openKey=item.key
    //             // }
    //             return(
    //                     <SubMenu 
    //                     key={item.key}
    //                         title={
    //                         <span>
    //                             <Icon type={item.icon} />
    //                             <span>{item.title}</span>
    //                         </span>
    //                     }
    //                     >
    //                         {this.getMenuNodes(item.childern)}
    //                     </SubMenu>
    //             )
    //         }
           
    //     })
                        
                        
    // }


    componentWillMount(){
        this.menuNodes=this.getMenuNodes2(menuList)
    }


    
    render(){
        let path=this.props.location.pathname
        return (
            <div className='left-nav'>
                     
                        <Link className='left-nav-header' to="/home">
                            <img src={logo} alt='logo'></img>
                            <h1>硅谷后台</h1>
                        </Link>
                       
                        
                  
                   
                    <Menu 
                    theme="dark" 
                    selectedKeys={[path]}
                    defaultOpenKeys={[this.openKey]} 
                    mode="inline">
                     {this.menuNodes}
                    </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)
