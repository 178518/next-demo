const koaBody = require('koa-body');

export default koaBody({
  multipart: true, // 支持文件上传
  formidable: {
    maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
  },
  formLimit: '10mb',
  jsonLimit: '5mb',
  textLimit: '5mb',
});
