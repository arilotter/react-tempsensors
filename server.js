const webpack = require('webpack');
const express = require('express');
const path = require('path');
const hotMiddleware = require('webpack-hot-middleware');
const devMiddleware = require('webpack-dev-middleware');
const internalIp = require('internal-ip');
const config = require('./webpack.config.js');

const app = express();
const compiler = webpack(config);

app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  silent: false,
  stats: { color: true }
}));
app.use(hotMiddleware(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './src/www/index.html'));
});

const port = 3000;
const ip = internalIp.v4();

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Temperature Sensors development server listening on http://${ip}:${port}`);
});
