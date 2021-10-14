const net = require("net");
const MyTransform = require("./MyTransform");
const transform = new MyTransform();

const server = net.createServer();

server.on("connection", (socket) => {
  let restChunk;
  let len = 0;
  socket.on("data", (chunk) => {
    while ((len = transform.getPackageLen(chunk))) {
      let allChunk = restChunk ? Buffer.concat([chunk, restChunk]) : chunk;
      const current = allChunk.slice(0, len);
      chunk = allChunk.slice(len);
      console.log(transform.decode(current));
      socket.write(transform.encode("Hello"));
    }
    restChunk = chunk;
  });
});

server.on("close", () => {
  console.log("server close");
});

server.on("error", (err) => {
  console.error(err);
});

server.listen(4001);
