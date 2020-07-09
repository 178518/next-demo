import App from 'next/app';
import React, { Component } from 'react';
import Head from 'next/head';
import PcLayout from 'components/layout';

const debug = require('debug')('app:App');

class Layout extends Component {
  render() {
    const { children } = this.props;
    return (<PcLayout>{children}</PcLayout>);
  }
}

class InitApp extends App {
  static async getInitialProps({ Component, ctx }) {
    /**
     * 进入匹配的路由组件，判断是服务端渲染还是客户端渲染
     * 组件的公共数据往后透传_document和对应的app
     * 命令路由的组件和app之间共享props
     * 如果页面有getInitialProps函数，要先执行页面的getInitialProps，然后当做pageProps传递给页面
     */
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (ctx && !ctx.req) {
      //客户端执行
      debug('Exce In %s', 'client');
    } else {
      //服务端执行
      debug('Exce In is %s', 'server');
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps} = this.props;

    // Component代指页面组件，就是pages下面的页面组件，将getInitialProps中pageProps传递给每个页面
    return (<Layout>
        <Head>
          <title>Demo</title>
          <meta name="keywords" content="Demo" />
          <meta name="description" content="Demo" />
        </Head>
        <Component {...pageProps} />
      </Layout>);
  }
}

export default InitApp;
