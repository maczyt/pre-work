import React from 'react'
import { findDOMNode } from 'react-dom'
import App from './App'
import { shallow, mount } from 'enzyme'

describe('测试App组件', () => {
  test('测试标题', () => {
    let app = shallow(<App />)
    expect(app.find('h1').text()).toEqual('非凡教育React面试第一关')
  })
  const testData = '[1,2,3,0,6]'
  test('测试得到一组平衡值', () => {
    let app = mount(<App />)
    let input = app.find('input').get(0)
    let btn = app.find('.btn')
    
    input.value = testData
    btn.simulate('click')
    expect(+app.find('.data').get(0).getAttribute('data-index')).toEqual(3)
  })
})