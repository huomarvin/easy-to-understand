module.exports = {
  mode: "development",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /.md$/,
        use: ["./lib/index.js"],
      },
    ],
  },
};
