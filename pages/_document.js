import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
/**
 * document
 * 1. 只有在服务端渲染的时候才会被调用
 * 2. 用来修改服务端渲染的文档内容
 * 3. 一般用来配合第三方css-in-js方案使用
 */

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => (props) => sheet.collectStyles(<App {...props} />),
        // enhanceComponent: Component => withLog(Component)
      });
      const props = await Document.getInitialProps(ctx);
      return {
        ...props,
        styles: (
          <>
            { props.styles }
            { sheet.getStyleElement() }
          </>
        )
      };
    } finally {
      sheet.seal();
    } 
  }
  render() {
    return (
      <Html>
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

function withLog(Comp) {
  return (props) => {
    console.log(props);
    return <Comp {...props} />
  }
}