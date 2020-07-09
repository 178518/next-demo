// @ts-ignore
require('colors');
const next = require('next');
const Koa = require('koa');
const Router = require('koa-router');
const KeyGrip = require('keygrip');
const Middlewares = require('./middlewares');

const port = parseInt(process.env.PORT || '', 10) || 8088;
const dev = process.env.NODE_ENV !== 'production';

// @ts-ignore
console.log(`${`Node dev Environment is ${dev}`.green}`);

const app = next({ dev });
// 清洁URL
const handle = app.getRequestHandler();

app.prepare()
  .then(async () => {
    const server = new Koa();
    const router = new Router();

    /**
     * 服务端路由
     * ts模块引用的时候需要加.default
     */
    const serverRouter = require('./routers/index').default(app);

    const { compress, koaBody, applogger } = Middlewares;

    // 设置签名的 Cookie 密钥。
    server.keys = new KeyGrip(['sec_web', 'tongdun'], 'sha256');

    server.envDev = dev;

    /**
     * 压缩需要尽早使用
     * https://blog.csdn.net/dreamjay1997/article/details/85229277
     */
    server.use(compress);

    /**
     * koaBody 必须放在bodyParser前面
     */
    server.use(koaBody);


    /**
     * 越早记录越好
     */
    server.use(applogger);
    // server.use(favicon);

    server.use(serverRouter.routes()).use(serverRouter.allowedMethods());

    /**
     * 静态资源兜底路由
     */
    router.get('*', async (ctx: any) => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    server.use(async (ctx: any, next: any) => {
      ctx.res.statusCode = 200;
      await next();
    });

    server.use(router.routes());

    server.listen(port, () => {
      // @ts-ignore
      console.log(`${`> App is start on http://localhost:${port}`.blue.bold.underline}`);
    });
  });
