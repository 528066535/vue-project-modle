const koa = require('koa');
const path = require('path');
const config = require('./build/webpack.dev.js');
const webpack = require('webpack');
const middleware = require('webpack-koa2-middleware');
const CONFIG = require('./CONFIG');
const proxy = require('koa-proxies');

const app = new koa();

const compiler = webpack(config);
app.use(middleware(compiler, {
    index: 'index.html',
    stats: {
        colors: true
    }
}));

app.use(proxy('/api', {
    target: CONFIG.API_URL,
    xfwd: true,
    changeOrigin: false,
    rewrite: path => {
        return path.replace('/api/', '/');
    },
    logs: false
}));

app.listen(CONFIG.PORT);