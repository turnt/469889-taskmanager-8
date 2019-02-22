const path = require(`path`);

module.exports = {
  devtool: `source-map`,
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, `public`),
    lazy: true,
    port: 9000,
  },
  entry: `./src/main.js`,
  mode: `development`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  }
};
