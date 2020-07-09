const compress = require('koa-compress'); // gzip 压缩

export default compress({
  // 只有在请求的content-type中有gzip类型，我们才会考虑压缩，因为zlib是压缩成gzip类型的
  filter(contentType: any) {
    return /text/i.test(contentType);
  },
  threshold: 2048, // 阀值，当数据超过1kb的时候，可以压缩
  flush: require('zlib').Z_SYNC_FLUSH, //// zlib是node的压缩模块
});
