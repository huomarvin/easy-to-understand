const Koa = require("koa");
const path = require("path");
const Router = require("@koa/router");
const app = new Koa();
const router = new Router();
const { handleUploadReq, getStorageBase } = require("./utils");

app.use(require("koa-static")(path.resolve(__dirname, "static")));
app.use(require("koa-static")(path.resolve(__dirname, "tmp")));

router.post("/upload/form", async (ctx, next) => {
  const result = await handleUploadReq(ctx.req, getStorageBase("img"));
  ctx.body = result;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log(`3000端口监听成功`);
});
