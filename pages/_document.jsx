import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import commProps from './common/commProps';

export default class Layout extends Document {
  static async getInitialProps(ctx) {
    //document只有在服务端渲染时候才会执行
    const initialProps = await Document.getInitialProps(ctx);

    /*
     * 静态导入，新增必须要重启
     */
    const { isMobile } = commProps(ctx);

    return { ...initialProps, isMobile };
  }

  render() {
    return (
      <html lang="zh-CN" style={{ fontSize: '100px' }}>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="renderer" content="webkit" />

        <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="/favicon.ico" rel="bookmark" type="image/x-icon" />
        <link rel="dns-prefetch" href="//sec.xiaodun.com" />
        <link rel="dns-prefetch" href="//portal-static.tongdun.cn" />
        <link rel="preconnect" href="//sec.xiaodun.com" />

        <link rel="stylesheet" type="text/css" href="https://portal-static.tongdun.cn/static-public/!!sec/css/1.0.0/common.min.css,seed/css/1.0.1/nprogress.css,seed/swiper/1.0.0/swiper.min.css" />
      </Head>
      <body>
      <Main />

      <script src="https://portal-static.tongdun.cn/static-public/seed/react/1.0.1/!!babel-polyfill/dist/polyfill.min.js,prop-types/prop-types.min.js,react/umd/react.production.min.js,react-dom/umd/react-dom.production.min.js" />

      <NextScript />
      </body>
      </html>
    );
  }
}
