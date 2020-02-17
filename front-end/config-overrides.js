const {
  override,
  addWebpackResolve,
  fixBabelImports,
  addLessLoader
} = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackResolve({
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      fs: path.resolve(__dirname, "src/util/mock-fs.js")
    }
  }),
  fixBabelImports("antd", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#D7C589" }
  })
);
