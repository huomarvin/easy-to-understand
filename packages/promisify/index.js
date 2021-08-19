const util = require("util");
const fs = require("fs");
const path = require("path");

/**
 * @param {Function} func
 * @returns
 */
function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      func.call(this, ...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
}

const _readFile = promisify(fs.readFile);
const filepath = path.resolve(__dirname, "./1.txt");

fs.readFile(filepath, "utf8", (err, data) => {
  console.log("async data:", data);
});

_readFile(filepath, "utf8").then((data) => {
  console.log("_data:", data);
});

const readFile = util.promisify(fs.readFile);

readFile(filepath, "utf8").then((data) => {
  console.log("data:", data);
});
