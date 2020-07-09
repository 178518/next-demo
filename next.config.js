const isProd = process.env.NODE_ENV === 'production';
const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {};
}

/**
 * 自定义配置
 * http://jartto.wang/2018/06/08/nextjs-3/
 */
module.exports = withBundleAnalyzer(withLess(withCSS({
  //target : 'serverless', // 无服务器模式
  distDir: 'dist',
  //配置页面后缀名解析扩展
  pageExtensions: ['js', 'jsx', 'ts'],
  generateEtags: false,
  crossOrigin: 'anonymous',
  useFileSystemPublicRoutes: false, // 禁止文件路由
  cssModules: false, // 是否启用cssModules
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]_[hash:base64:5]', // 此处是为了可以使生成的css module可辨识
  },
  lessLoaderOptions: {
    cssModules: true,// cssModules 暂不支持
    javascriptEnabled: true,
  },
  antdLessLoaderOptions: {
    javascriptEnabled: true,
  },
  /*postcssLoaderOptions: {
    parser: true,
    config: {
      ctx: {
        theme: JSON.stringify(process.env.REACT_APP_THEME),
      },
    },
  },*/
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
  generateBuildId: async () => {
    if (process.env.YOUR_BUILD_ID) {
      return process.env.YOUR_BUILD_ID;
    }

    return 'sec' + new Date().getTime();
  },
  /**
   * https://github.com/zeit/next.js/issues/4010
   * @param config
   * @param buildId buildId - 字符串类型，构建的唯一标示
   * @param dev 判断你是否在开发环境下
   * @param isServer 为true使用在服务端, 为false使用在客户端.
   * @param defaultLoaders 内部加载器, 你可以如下配置
   * @param webpack
   * @returns {*}
   */
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    /**
     * 仅开发环境启用，启用后热更新需要自动刷新页面
     */
    const tempExternals = {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'nprogress': 'NProgress',
      'prop-types': 'PropTypes',
    };

    config.externals = config.externals ? Object.assign(config.externals, tempExternals) : tempExternals;

    config.plugins.push(new ForkTsCheckerWebpackPlugin());

    // https://www.bookstack.cn/read/next.js-zh/%E6%B5%8F%E8%A7%88%E5%99%A8%E6%94%AF%E6%8C%81.md
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js'] && !entries['main.js'].includes('./client/polyfill.js')) {
        entries['main.js'].unshift('./client/polyfill.js');
      }

      return entries;
    };

    if (isServer) {
      /**
       * antd antd-mobile动态打包使用
       * @type {RegExp}
       */
      /*const antdStyles = /antd\/.*?\/style\/css.*?/;
      const origAntdExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antdStyles)) return callback();
          if (typeof origAntdExternals[0] === 'function') {
            origAntdExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origAntdExternals[0] === 'function' ? [] : origAntdExternals),
      ];

      config.module.rules.unshift({
        test: antdStyles,
        use: 'null-loader',
      });

      const antStyles = /antd-mobile\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });*/
    }

    return config;
  },
  /*webpackDevMiddleware: config => {
    /!**
     * 仅开发环境启用，启用后热更新需要自动刷新页面
     *!/
    const tempExternals = {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'redux': 'Redux',
      'react-redux': 'ReactRedux',
      'redux-thunk': 'var window.ReduxThunk.default',
      'react-router': 'ReactRouter',
      'react-router-dom': 'ReactRouterDOM',
      'react-router-redux': 'ReactRouterRedux',
      'connected-react-router': 'ConnectedReactRouter',
      'history': 'History',
      'nprogress': 'NProgress',
      'prop-types': 'PropTypes',
    };

    config.externals = config.externals ? Object.assign(config.externals, tempExternals) : tempExternals;

    return config;
  },*/
  /*serverRuntimeConfig: { // Will only be available on the server side
    mySecret: 'secret',
  },*/
  publicRuntimeConfig: { // Will be available on both server and client
    staticFolder: '/public',
  },
  // You may only need to add assetPrefix in the production.
  assetPrefix: isProd ? '' : '',
})));
