# ssr-proj
react ssr project

## 为什么要使用KOA（nextjs作为KOA中间件使用）
* nextjs自身带有服务器，只处理SSR渲染
* 处理HTTP请求，并根据请求数据返回相应内容
* 根据域名之类的HOST来定位服务器
* nextjs无法处理服务端`数据接口`、`数据库链接`、`session状态`
* koa是一个非常流行的轻量级nodejs服务端框架，相对轻量，易于扩展，编程模式符合js特性