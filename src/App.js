import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {message} from 'antd'

import Login from './pages/login/login.jsx'
import Admin from './pages/admin/Admin.jsx'

/*
应用的根组件
 */
export default class App extends Component {
  handleClick=()=>{
    message.success('成功了')
  }

  render () {
    return (
      <BrowserRouter>
        <Switch> 
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}