const requestIp = require('request-ip');

/**
 * 记录所有http请求
 * === export const logger = async (ctx: any, next: any)
 * @param ctx
 * @param next
 */
export default async (ctx: any, next: any) => {
  const clientIp = requestIp.getClientIp(ctx.request);

  console.log(`the sec-web request info method ${ctx.method} url ${ctx.href} clientIp ${clientIp} UserAgent ${ctx.headers['user-agent']}`);

  await next();
};
