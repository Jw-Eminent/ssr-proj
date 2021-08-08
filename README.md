# ssr-proj
react ssr project

## 为什么要使用KOA（nextjs作为KOA中间件使用）
* nextjs自身带有服务器，只处理SSR渲染
* 处理HTTP请求，并根据请求数据返回相应内容
* 根据域名之类的HOST来定位服务器
* nextjs无法处理服务端`数据接口`、`数据库链接`、`session状态`
* koa是一个非常流行的轻量级nodejs服务端框架，相对轻量，易于扩展，编程模式符合js特性

## Koa
* 很轻量，帮我们组织了整个Http请求从进入到完成的一个流向，这样我们可以通过中间件把我们的一些功能组合进来
* 主要API：`app.use`、`ctx对象`、`request、response、req、res`
* ctx对象：`记录了请求的内容，以及返回时通过设置一些属性来进行`
* ctx.req、ctx.res：`Node request和response对象`
* ctx.request、ctx.response：`本质上是Koa创建的reqeust类和response类的实例，这两个类实际上是对Node中request和`
  `response中属性的一些get和set方法的封装`

## redis
* 安装：1. 官网下载源码，进入目录执行make，sudo make install 2. 使用homebrew安装
* 内存数据解构存储，可持久存储，支持多种数据结构
* 主要API: `set  set key value、 get  get key、setex(设置过期时间) setex key expired(ms) value、 DEL DEL key`

## 使用ioredis进行数据库链接
```javascript
async function test() {
  const Redis = require('isredis');

  const redis = new Redis({
    port: 6378,
    password: 123456
  });

  await redis.setex('c', 10, 123);
  const keys = await redis.keys('*');
}
```

## Nextjs
### 目录结构
* pages目录下js文件对应一个页面，排除_app.js, _doucument.js
* componnets目录 公用组件
* lib目录 非组件性的公用代码
* static目录 静态资源 图片 Icon等
* .next next build出的内容
* next.config.js 配置文件

### 服务端渲染流程
* getInitialProps 在页面渲染前被执行；服务端渲染的时候执行，在客户端页面跳转的时候也会执行
* 服务端流程：
  *浏览器发起/page请求
  *koa接收到请求，并调用nextjs
  *nextjs开始渲染
  *调用app的getInitialProps
  *调用页面的getInitialProps
  *渲染出最终的html
* 客户端路由跳转
  *点击链接按钮
  *异步加载页面的组件js
  *调用页面的getInitialProps
  *数据返回，路由变化，页面渲染