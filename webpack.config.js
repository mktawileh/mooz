const path = require("path");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "./src/index.ts"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "./dist/umd"), // builds to ./dist/umd/
    filename: "[name].js",
    library: "Mooz",
    libraryExport: "default",
    libraryTarget: "umd", // supports commonjs, amd and web browsers
    globalObject: "this",
  },
};
