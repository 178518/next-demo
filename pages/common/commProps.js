/**
 * 客户端服务端公用
 * @param ctx
 * @returns {{isMobile: boolean}}
 */
export default (ctx) => {
  const deviceAgent = ctx.req ? ctx.req.headers['user-agent'].toLowerCase() : navigator.userAgent.toLowerCase();

  const isMobileClient = deviceAgent.match(/(iphone|ipod|android|ios|ipad|symbianos|windows phone)/);
  //是否微信 （2015-01-22新增）
  const isWeixin = deviceAgent.indexOf('micromessenger') > -1;

  const isMobile = !!isMobileClient || isWeixin;

  return { isMobile };
};
