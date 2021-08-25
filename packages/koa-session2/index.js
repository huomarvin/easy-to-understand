const session = require(".");
const Koa = require("koa");

const app = new Koa();

const config = {
  key: "koa:sess",
};

app.use(session(config));

app.use(async (ctx, next) => {
  if (ctx.url !== "/favicon.ico") {
    ctx.session.count = (ctx.session.count || 0) + 1;
    ctx.body = ctx.session.count;
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
