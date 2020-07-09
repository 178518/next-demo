import path from 'path';
// @ts-ignore
import favicon from 'koa-favicon';

// console.log(path.resolve('./static/favicon.ico'));

export default favicon(path.resolve('./public/favicon.ico'));
