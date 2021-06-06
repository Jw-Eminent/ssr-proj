const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler(); // 处理http请求

//pages 页面加载完成之后，启动服务
app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get('/page_2/:id', async (ctx) => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: '/page_2',
      query: { id }
    });
    ctx.respond = false;
  })

  server.use(router.routes());

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.listen(3000, () => {
    console.log('koa server listening on 3000');
  })
})


// Koa基本使用
// const server = new Koa();
// const router = new Router();

// router.get('/test/:id', (ctx) => {
//   // ctx.body = `<p>request /test ${ctx.params.id}</p>`;
//   ctx.body = { success: true };
//   ctx.set('Content-Type', 'application/json');
// });

// server.use(async (ctx, next) => {
//   const { path, method } = ctx;
//   ctx.body = `<span>Koa Render ${method} ${path}</span>`;
//   await next(); // 只有调用next 才可以执行下一个中间件
// }); // 使用Koa中间件

// server.use(router.routes());

// // 按照use调用的顺序来执行

// server.listen(3000, () => {
//   console.log('koa server listening on 3000');
// })