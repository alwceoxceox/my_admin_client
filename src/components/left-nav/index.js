import React,{Component} from 'react'
import { Layout, Menu, Breadcrumb, Icon ,Link} from 'antd';
import logo from '../../assets/images/logo.png'
import './index.less'




const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default class LeftNav extends Component{
    render(){
        return (
            <div className='left-nav'>
                     
                        <a className='left-nav-header'>
                            <img src={logo}></img>
                            <h1>硅谷后台</h1>
                        </a>
                       
                    
                  
                   
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>Option 1</span>
                        </Menu.Item>
                        
                        <SubMenu
                        key="/products"
                        title={
                          <span>
                            <Icon type="mail" />
                            <span>商品</span>
                          </span>
                        }
                        >
                        <Menu.Item key="/category">
                                <a >
                                    <Icon type="folder-open" />
                                    <span>品类管理</span>
                                </a>
                                </Menu.Item>
                                <Menu.Item key="/product">
                                <a>
                                    <Icon type="filter" />
                                    <span>商品管理</span>
                                </a>
                            </Menu.Item>
                        </SubMenu>
                        
                    </Menu>
              
                
            </div>
        )
    }
}