const koa = require('koa');
const path = require('path');
const config = require('./build/webpack.prod.js');
const webpack = require('webpack');
const middleware = require('webpack-koa2-middleware');
const CONFIG = require('./CONFIG');
const proxy = require('koa-proxies');
const koaStatic = require('koa-static');
const koaEjs = require('koa-ejs');

const app = new koa();

//静态目录
let originalServe = koaStatic(path.join(__dirname, '/dist'), {
    maxage: 31536000000 //1年
});
let modifiedServe = function(ctx, next) {
    ctx.path = ctx.path.replace('/dist', '/');
    return originalServe(ctx, next);
};
app.use(modifiedServe);

//ejs模板
koaEjs(app, {
    root: path.join(__dirname),
    layout: null,
    viewExt: 'html',
    cache: false,
    debug: true
});

// const compiler = webpack(config);
// app.use(middleware(compiler, {
//     index: 'index.html',
//     stats: {
//         colors: true
//     }
// }));

app.use(proxy('/api', {
    target: CONFIG.API_URL,
    xfwd: true,
    changeOrigin: false,
    rewrite: path => {
        return path.replace('/api/', '/');
    },
    logs: true
}));

app.use(async (ctx)=>{
    await ctx.render('dist/index');
});

app.listen(CONFIG.PORT);