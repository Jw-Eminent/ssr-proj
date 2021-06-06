import App, { Container } from 'next/app';
import 'antd/dist/antd.css';

import Layout from '../components/Layout';

/**
 * 自定义App的作用
 * 1. 固定Layout
 * 2. 保持一些公用的状态
 * 3. 给页面传入一些自定义数据
 * 4. 自定义错误处理
 */

class MyApp extends App {
  // 每次页面切换都会执行getInitialProps方法
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    let pageProps = {};
    if (Component.getInitialProps) {
    // 这里必须要执行自组件的getInitialProps方法，否则会导致自组件的getInitialProps方法不执行
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps
    };
  }

  render() {
    const { Component, pageProps } = this.props; // Component 为当前渲染的组件
    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}

export default MyApp;