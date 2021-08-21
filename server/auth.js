const axios = require('axios');

const config = require('../config');

const { client_id, client_secret, req_token_url } = config.github;

module.exports = (server) => {
  server.use(async (ctx, next) => {
    if (ctx.path === '/auth') {
      const code = ctx.query.code;
      if (!code) {
        ctx.code = 'code not exist';
        return;
      }
      // 获取token
      const res = await axios({
        method: 'POST',
        url: req_token_url,
        data: {
          client_id,
          client_secret,
          code,
        },
        headers: {
          Accept: 'application/json'
        }
      });
      const err = res.data && res.data.error;

      if (res.status === 200 && res.data && !res.data.error) {
        ctx.session.githubAuth = res.data;

        const { access_token, token_type } = res.data;

        // 根据token获取用户信息
        const uerInfoResp = await axios({
          method: 'GET',
          url: 'https://api.github.com/user',
          headers: {
            'Authorization': `${token_type} ${access_token}`
          }
        });
        ctx.session.userInfo = uerInfoResp.data || {};
        ctx.redirect('/');
      } else {
        ctx.body = `request token failed ${err || ''}`;
      }
    } else {
      await next();
    }
  })
}