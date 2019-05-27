const koa = require('koa');
const path = require('path');
const config = require('./build/webpack.prod.js');
const webpack = require('webpack');
const middleware = require('webpack-koa2-middleware');
const CONFIG = require('./CONFIG');

const app = new koa();

const compiler = webpack(config);
app.use(middleware(compiler, {
    index: 'index.html',
    stats: {
        colors: true
    }
}));

app.listen(CONFIG.PORT);