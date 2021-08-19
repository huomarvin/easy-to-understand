const fs = require("fs");
const Busboy = require("busboy");
const path = require("path");
const { v4 } = require("uuid");

function createPath(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

const getStorageBase = (base) => {
  return path.join(process.cwd(), "tmp", base);
};
const randomFileName = (filename) => `${v4()}${path.extname(filename)}`;

/**
 * @param {Node.HTTPRequest} req
 * @param {string} storagePath
 */
function handleUploadReq(req, storagePath) {
  createPath(storagePath);
  const busboy = new Busboy({ headers: req.headers });
  return new Promise((resolve, reject) => {
    const result = {
      success: false,
      message: "",
      data: {},
    };
    busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
      const randomName = randomFileName(filename);
      file.pipe(fs.createWriteStream(path.resolve(storagePath, randomName)));
      file.on("end", function () {
        result.success = true;
        result.data = randomName;
        result.message = "上传成功";
        resolve(result);
      });
      file.on("error", function (error) {
        result.success = false;
        result.message = error.toString();
        resolve(result);
      });
    });
    busboy.on("finish", function () {});
    busboy.on("error", function (err) {
      reject(err);
    });
    req.pipe(busboy);
  });
}

module.exports = {
  getStorageBase,
  handleUploadReq,
};
