class RedisSessionStore {
  constructor(client) {
    this.client = client; // Redis client
  }
  /**
   * 获取Redis中存储的session数据
   * @param {*} sid
   * @memberof RedisSessionStore
   */
  async get(sid) {
    const id = getRedisSessionId(sid);
    const data = await this.client.get(id); // 作用等同于命令行中 执行get (连接Redis数据库执行)
    if (!data) {
      return null;
    }

    try {
      const res = JSON.parse(data);
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * 存储session数据到Redis
   * @param {*} sid
   * @param {*} sess: session 内容
   * @param {*} ttl: 过期时间
   * @memberof RedisSessionStore
   */
  async set(sid, sess, ttl) {
    const id = getRedisSessionId(sid);
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000);
    }

    try {
      const sessStr = JSON.stringify(sess);
      if (ttl) {
        await this.client.setex(id, ttl, sessStr);
      } else {
        await this.client.set(id, sessStr);
      }
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * 从Redis中删除某个session
   * @param {*} sid
   * @memberof RedisSessionStore
   */
  async destroy(sid) {
    const id = getRedisSessionId(sid);
    await this.client.del(id);
  }
}
/**
 *
 *
 * @param {*} sid
 * @return {*} 存储在Redis数据库中所有的key都是放在一起的，通过此方法返回一个带有特定前缀的id，以做区分
 */
function getRedisSessionId(sid) {
  return `ssid:${sid}`;
}

module.exports = RedisSessionStore;