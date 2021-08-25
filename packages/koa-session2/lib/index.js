const { v4 } = require("uuid");

const Map = {};

module.exports = (config) => async (ctx, next) => {
  const { key: sessId = "koa:sess" } = config;
  let sessKey = ctx.cookies.get(sessId);
  if (Map[sessKey]) {
    ctx.session = Map[ctx.cookies.get(sessId)];
    await next();
  } else {
    const uuid = v4();
    ctx.cookies.set(sessId, uuid);
    ctx.session = Map[uuid] = {};
    await next();
  }
};
