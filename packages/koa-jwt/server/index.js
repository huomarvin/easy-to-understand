const Koa = require("koa");
const path = require("path");
const jwtAuth = require("koa-jwt");
const jwt = require("jsonwebtoken");
const bodyParser = require("koa-bodyparser");
const Router = require("@koa/router");
const router = new Router();
const cors = require("koa-cors");
const app = new Koa();

const secret = "biubiubiu";

app.use(cors());
app.use(bodyParser());
app.use(require("koa-static")(path.join(__dirname, "../brower"), {}));
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = "Protected resource, use Authorization header to get access\n";
    } else {
      throw err;
    }
  });
});

router.get(
  "/getLoginInfo",
  jwtAuth({
    secret,
  }),
  async (ctx, next) => {
    console.log("ctx.state.user", ctx.state.user);
    if (ctx.state.user) {
      ctx.body = { success: true, tokenData: ctx.state.user };
    } else {
      ctx.body = { success: false, msg: "未查询到登录用户信息" };
    }
  }
);

router.post("/login", async (ctx, next) => {
  const { body } = ctx.request;
  if (body.name === "gailun" && body.password === "demaxiya") {
    ctx.body = {
      token: jwt.sign(
        {
          name: "gailun",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      ),
      success: true,
    };
  } else {
    ctx.body = {
      success: false,
      msg: "username or password error",
    };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4000, () => {
  console.log("4000端口监听成功, 请打开http://localhost:4000");
});
