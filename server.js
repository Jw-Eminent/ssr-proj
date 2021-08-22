const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');
const session = require('koa-session');
const Redis = require('ioredis');

const RedisSessionStore = require('./server/session-store');
const auth = require('./server/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler(); // 处理http请求

// 创建Redis client
const redis = new Redis();

//pages 页面加载完成之后，启动服务
app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = ['Jw is eminent hhhh']; // 用来给cookie加密
  const SESSION_CONFIG = {
    key: 'jid',
    // maxAge: 10 * 1000,
    store: new RedisSessionStore(redis)
  };

  server.use(session(SESSION_CONFIG, server));

  // 配置处理github OAuth登录
  auth(server);

  router.get('/page_2/:id', async (ctx) => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: '/page_2',
      query: { id }
    });
    ctx.respond = false;
  });

  // 增加获取用户信息接口
  // router.get('/api/user/info', async ctx => {
  //   const user = ctx.session.userInfo;
  //   if (!user) {
  //     ctx.status = 401;
  //     ctx.body = 'Need Login'
  //   } else {
  //     ctx.body = user;
  //     ctx.set('Content-Type', 'application/json');
  //   }
  // });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    ctx.res.session = ctx.session;
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
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

// router.get('/set/user', async ctx => {
//   ctx.session.user = {
//     name: 'jwwang',
//     age: 18
//   };
//   ctx.body = 'set session success';
// });

// router.get('/delete/user', async ctx => {
//   ctx.session = null; // 设置ctx.session 为null，就会调用destroy方法
//   ctx.body = 'delete session success';
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