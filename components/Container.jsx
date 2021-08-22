import React, { cloneElement } from 'react';

const style = {
  width: '100%',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 20,
  paddingRight: 20,
}

// 通过cloneElement拓展组件的可复用性
export default ({ children, renderer = <div /> }) => {
  const newElement = cloneElement(renderer, {
    style: Object.assign({}, renderer.props.style, style),
    children,
  })

  return newElement
}