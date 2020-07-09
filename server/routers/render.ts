import Router from 'koa-router';

export default (app: any) => {
  const PageRouter = new Router({
    strict: true, // 是否严格匹配大小写，如果设置为false则匹配路径后边的/是可选的
    sensitive: true, // 以更严格的匹配规则来监听路由，不会忽略URL中的大小写，完全按照注册时的来匹配：
  });
  const statusCode = 200;
  const respond = false;

  PageRouter.get('/demo', async (ctx: any) => {
    ctx.res.statusCode = statusCode;

    /**
     * 定义路由渲染
     * req
     * res
     * pathname 相对于pages的目录
     * query
     */
    await app.render(ctx.req, ctx.res, '/demo', ctx.query);
    // 不使用koa内置的response处理方法
    ctx.respond = respond;
  });

  return PageRouter;
};
