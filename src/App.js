import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {increment,decrement} from './redux/actions'
/*
应用的根组件
 */
export default class App extends Component {
  static propTypes={
    store:PropTypes.object.isRequired
  }
  increment = () => {
    const number = this.refs.numberSelect.value * 1
    this.props.store.dispatch(increment(number))
  }
  decrement=()=>{
    const number=this.refs.numberSelect.value*1
    this.props.store.dispatch(decrement(number))
  }
  incrementIfOdd=()=>{
    const number=this.refs.numberSelect.value*1
    const count=this.props.store.getState()
    if(count%2===1){
      this.props.store.dispatch(increment(number))
    }
  }
  incrementAsync=()=>{
    const number=this.refs.numberSelect.value*1
    setTimeout(()=>{
      this.props.store.dispatch(increment(number))      
    },500)
  }

  render () {
    console.log('App render()')
    const count=this.props.store.getState()
    return (
      <div>
          <p>
             click {count} times
          </p>
          <select ref='numberSelect'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
          <button  onClick={this.increment}>+</button>
          <button  onClick={this.decrement}>-</button>
          <button  onClick={this.incrementIfOdd}>increment if odd</button>
          <button  onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}