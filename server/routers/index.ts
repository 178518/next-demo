// @ts-ignore
import Router from 'koa-router';
import Render from './render';

export default (app: any) => {
  // 装载所有子路由
  const router = new Router();

  router.use(Render(app).routes(), Render(app).allowedMethods());

  return router;
};
