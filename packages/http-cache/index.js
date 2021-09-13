const http = require("http");
const fs = require("fs");
const path = require("path");
const etag = require("etag");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const htmlBuffer = fs.readFileSync(
      path.resolve(__dirname, "./public/index.html")
    );
    res.end(htmlBuffer);
  } else if (req.url === "/favicon.ico") {
    const icoBuffer = fs.readFileSync(
      path.resolve(__dirname, "./public/favicon.ico")
    );
    res.end(icoBuffer);
  } else if (req.url === "/strong-cache.jpeg") {
    res.writeHead(200, {
      Expires: new Date(new Date().valueOf() + 60 * 1000 * 1).toUTCString(),
    });
    res.end(fs.readFileSync(path.resolve(__dirname, "./public/test.jpeg")));
  } else if (req.url === "/strong-cache-max-age.jpeg") {
    res.writeHead(200, {
      "Cache-Control": "max-age=5", // 浏览器自己去算偏移量
    });
    res.end(fs.readFileSync(path.resolve(__dirname, "./public/test.jpeg")));
  } else if (req.url === "/no-store.jpeg") {
    res.writeHead(200, {
      "Cache-Control": "no-store", // 浏览器自己去算偏移量
    });
    res.end(fs.readFileSync(path.resolve(__dirname, "./public/test.jpeg")));
  } else if (req.url === "/no-cache-last-modify.jpeg") {
    const { mtime } = fs.statSync("./public/test.jpeg");
    const ifModifiedSince = req.headers["if-modified-since"];
    // 如果文件没有更改， 则命中缓存
    if (ifModifiedSince === mtime.toUTCString()) {
      // 缓存生效
      res.statusCode = 304;
      res.end();
      return;
    }
    const data = fs.readFileSync("./public/test.jpeg");
    res.setHeader("last-modified", mtime.toUTCString());
    res.setHeader("Cache-Control", "no-cache");
    res.end(data);
  } else if (req.url === "/no-cache-etag.jpeg") {
    const data = fs.readFileSync("./public/test.jpeg");
    const etagContent = etag(data);
    const ifNoneMatch = req.headers["if-none-match"];
    if (ifNoneMatch === etagContent) {
      res.statusCode = 304;
      res.end();
      return;
    }
    res.setHeader("etag", etagContent);
    res.setHeader("Cache-Control", "no-cache");
    res.end(data);
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000, () => {
  console.log("3000端口监听成功");
});
