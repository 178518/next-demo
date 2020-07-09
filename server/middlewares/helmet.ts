// @ts-ignore
import helmet from 'koa-helmet';

export default helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ['\'self\''],
    connectSrc: ['\'self\'', 'sphinx.tongdun.net', 'www.google-analytics.com', 'hm.baidu.com'],
    imgSrc: ['\'self\' data:', '*'],
    styleSrc: ['\'self\'', '\'unsafe-inline\'', 'portal-static.tongdun.cn', 'fonts.googleapis.com', 'static.tongdun.net'],
    scriptSrc: [
      '\'self\'',
      '\'unsafe-eval\'',
      'portal-static.tongdun.cn',
      'tag.baidu.com',
      'static.tongdun.net',
      'fp.tongdun.net',
      'sphinx.tongdun.net',
      'static.fraudmetrix.cn',
      'hm.baidu.com',
      'g.alicdn.com',
      'res.wx.qq.com',
      'www.google-analytics.com',
    ],
    fontSrc: ['\'self\' data:', 'fonts.gstatic.com'],
    mediaSrc: ['static.tongdun.net'],
  },
});
