import React from 'react';
import createStore from '../store/store';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState);
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default (Comp) => {
  class WithReduxApp extends React.Component {
    constructor(props) {
      super(props);
      console.log(props.initialReduxState);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    static getInitialProps = async (ctx) => {
      const reduxStore = getOrCreateStore({name: 'jwang'}); // 客户端渲染保证只有一个store
      ctx.reduxStore = reduxStore;
      
      let appProps = {};
      if (typeof Comp.getInitialProps === 'function') {
        appProps = await Comp.getInitialProps(ctx);
      }
  
      return {
        ...appProps,
        initialReduxState: reduxStore.getState() // 作为props返回，提供给constructor初始化store使用
      };
    };

    render() {
      const { Component, pageProps, ...rest } = this.props;
      if (pageProps) {
        pageProps.test = 'test';
      }

      return (
        <Comp 
          Component={Component} 
          pageProps={pageProps} 
          {...rest} 
          reduxStore={this.reduxStore}
        />
      );
    }
  }

  return WithReduxApp;
}