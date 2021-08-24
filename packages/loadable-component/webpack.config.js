const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-cheap-source-map",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
};
