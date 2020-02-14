const { override, addWebpackResolve } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackResolve({
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      fs: path.resolve(__dirname, "src/util/mock-fs.js")
    }
  })
);
