import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu,Icon } from 'antd';
import logo from '../../assets/images/logo.png'
import './index.less'
import menuList from '../../config/configMenu'




const { SubMenu } = Menu;


 class LeftNav extends Component{
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
                const cItem=item.children.find(cItem=>path.indexOf(cItem.key)===0)
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
    componentWillMount(){
        this.menuNodes=this.getMenuNodes2(menuList)
    }


    componentWillMount () {
        this.menuNodes = this.getMenuNodes2(menuList)
       }
    render(){
        
        let selectKey=this.props.location.pathname
        if(selectKey.indexOf('/product')===0){
            selectKey='/product'
        }
        return (
            <div className='left-nav'>
                     
                    <Link className='left-nav-header' to="/home">
                        <img src={logo} alt='logo'></img>
                        <h1>硅谷后台</h1>
                    </Link>
                    <Menu 
                    theme="dark" 
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openKey]} 
                    mode="inline">
                     {this.menuNodes}
                    </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)
