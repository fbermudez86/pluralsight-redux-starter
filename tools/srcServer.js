import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import Dashboard from 'webpack-dashboard';
import DashboardPlugin from 'webpack-dashboard/plugin';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

const dashboard = new Dashboard();

compiler.apply(new DashboardPlugin(dashboard.setData));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  quiet: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler,
  { log: () => {}}
));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
