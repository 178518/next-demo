const limit = require('koa-limit');

export default limit({
  limit: 120, // 限制访问次数
  interval: 1000 * 60, // 单位毫秒
  message: '请求已超过最大访问次数，请稍后重试！',
});
