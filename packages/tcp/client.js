const net = require("net");
const MyTransform = require("./MyTransform");
const transform = new MyTransform();
const client = net.createConnection({
  host: "127.0.0.1",
  port: 4001,
});

let restChunk = null;

client.on("data", (chunk) => {
  let len = 0;
  while ((len = transform.getPackageLen(chunk))) {
    let allChunk = restChunk ? Buffer.concat([chunk, restChunk]) : chunk;
    const current = allChunk.slice(0, len);
    chunk = allChunk.slice(len);
    console.log(transform.decode(current));
  }
  restChunk = chunk;
});
client.on("close", () => {
  console.log("client close");
});
client.on("error", (err) => {
  console.log(err);
});
client.write(transform.encode("A"));
client.write(transform.encode("B"));
client.write(transform.encode("C"));
client.write(transform.encode("D"));
