import React, { Component } from 'react'
import './App.css'
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: null,
      index: -2
    }
  }

  handleSubmit() {
    /**
     * 由于使用eval，需pre check 数据
     */
    const preCheck = /^\[([^，])+\]$/
    let data = this.refs.inputEl.value.trim()
    if (data) {
      if (!preCheck.test(data)) { 
        return this.setState({
          error: { 
            msg: '请输入合法数组, 谢谢'
          }
        })
      }

      if (this.state.error) this.setState({ error: null })
      data = eval(data) 
      const sum = eval(data.join('+'))
      const half = Math.floor(sum / 2)
      let index = -2

      data.reduce((a, b, ind) => {
        if (a === half) {
          index =  ind
        }
        return a + b
      }, 0)

      index --
      let left = data.slice(0, index)
      let right = data.slice(index)

      if (eval(left.join('+')) === eval(right.join('+'))) {
        this.setState({
          index: index
        })
      } else {
        this.setState({
          index: -1
        })
      }
    }
  }

  handleClick() {
    this.handleSubmit()
  }

  handleKeyUp(e) {
    if (e.which === 13) {
      this.handleSubmit()
    }
  }


  render() {
    return (
      <div className="app">
        <h1>非凡教育React面试第一关</h1>
        <div>
          <input type="text" className="input" ref="inputEl" onKeyUp={this.handleKeyUp.bind(this)} />
          <div className="get">
            <button className="btn" onClick={this.handleClick.bind(this)}>GET</button>
            <button>手气不错</button>
          </div>
        </div>
        <div className="res">
          <h2>Console</h2>
          <hr/>
          <div className="data" data-index={this.state.index}>
            {
              this.state.index !== -2 ? `平衡位: ${this.state.index}`: ''
            }
            {
              this.state.error ? <div className="error">{ this.state.error.msg }</div> : ''
            }
          </div>
        </div>
      </div>
    )
  }
}