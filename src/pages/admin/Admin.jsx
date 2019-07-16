import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import storageUtil from '../../utils/storageUtil'
import memoryUtil from '../../utils/memoryUtil';
import LeftNav from '../../components/left-nav'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';


const { Header, Footer, Sider, Content } = Layout;



export default class Admin extends Component{
    render(){
            const user=memoryUtil.user
                if(!user._id){
                    return <Redirect to='/login'/> 
                }
        return (
            <Layout style={{ height: '100%' }}>
            <Sider>
              <LeftNav />
            </Sider>
            <Layout>
              <Header/>
              <Content style={{ background: 'pink' }}>
                
              </Content>
              <Footer style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)'}}>
                推荐使用谷歌浏览器，可以获得更佳页面操作体验
              </Footer>
            </Layout>
          </Layout>
        )
    }
}